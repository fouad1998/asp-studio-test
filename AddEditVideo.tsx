import { IReduxAction } from "@interfaces/redux/IReduxAction";
import { IReduxState } from "@interfaces/redux/IReduxState";
import { Button, Grid, makeStyles, Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneralVideoDetails from "./GeneralVideoDetails";
import SelectVideoFile from "./SelectVideoFile";
import { S_FIELD_ERROR } from "@defaults/values/common/S_FIELD_ERROR";
import { useHistory, useRouteMatch } from "react-router";
import Loader from "@components/Loader/Loader";
import Switcher from "@components/common/Switcher";
import { exEmpty } from "@regexp/exEmpty";
import NetworkOperationFailed from "../../common/NetworkOperationFailed";
import { NetworkError } from "@utils/classes/NetworkError";
import { v1 } from "uuid";
import SuccessfulAdded from "@components/common/SuccessfulAdded";
import { CtxVideos } from "@contexts/CtxVideos";
import { fVideoEditRoute } from "@routes/fVideoEditRoute";
import { IVideoAdd } from "@interfaces/graphql/videos/IVideoAdd";
import { fVideosRoute } from "@routes/fVideosRoute";
import { fGoVideoEditRoute } from "@routes/fGoVideoEditRoute";
import { IVideo } from "@interfaces/graphql/product/IVideo";
import { fAddVideoRoute } from "@routes/fAddVideoRoute";

export interface AddVideoProps {}

const styles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: 400,
    minWidth: 500,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    position: "relative",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
  paperWithLoading: {
    padding: 0,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  controls: {
    padding: theme.spacing(8, 0, 3),
  },
  alert: {
    padding: theme.spacing(1, 0, 1),
  },
  buttonControls: {
    margin: theme.spacing(0, 1, 0, 1),
  },
}));
const steps = ["General information", "Selecte Video"];
const AddEditVideo: React.FC<AddVideoProps> = () => {
  const { oAddingVideo, bLoadingVideo, uoSelectedVideo, aUploadVideos } = useSelector((state: IReduxState) => {
    return {
      oAddingVideo: state.oAdding.oVideo,
      uoSelectedVideo: state.oSelected.uoVideo,
      bLoadingVideo: state.oLoading.bLoadingVideo,
      aUploadVideos: state.oUploading.aVideos,
    };
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { fAddVideo, fGetVideo, fAlterVideo, fSetVideoProperty } = useContext(CtxVideos);
  const [nCurrentStep, setNCurrentStep] = useState(oAddingVideo.nCurrentStep);
  const [uoError, setUOError] = useState<NetworkError | undefined>(void 0);
  const [bIsLoadingError, setBIsLoadingError] = useState(false);
  const classes = styles();
  const bIsEditingVideo = fVideoEditRoute() === path;
  const { id: sVideoID } = params as { id: string };
  const nUploadVideoIndex = aUploadVideos.findIndex(
    (oUpload) => oUpload.sUploadID === oAddingVideo.sID! && oUpload.oVideo === oAddingVideo
  );
  const bIsUploading = nUploadVideoIndex !== -1;
  const oUploadVideo = bIsUploading ? aUploadVideos[nUploadVideoIndex] : void 0;

  const hOnAddClickHandler = useCallback(
    (sOperation: "add" | "modify") => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setUOError(void 0);
      const { uoFile: file } = oAddingVideo;
      if (typeof file !== "object" && typeof uoSelectedVideo?.url !== "string") {
        const sError = `Sorry, You didn't fill the requierement to continue. ${
          typeof file !== "object" ? S_FIELD_ERROR.replace("{{field}}", "File") : ""
        }`;

        return setUOError(new NetworkError(sError, "UNKNOWN"));
      }

      try {
        if (sOperation === "add") {
          await fAddVideo();
        }

        if (sOperation === "modify") {
          await fAlterVideo();
        }

        setNCurrentStep(steps.length);
        fSetVideoProperty("nCurrentStep")(oAddingVideo.nCurrentStep + 1);
      } catch (oError) {
        setUOError(oError as NetworkError);
      }
    },
    [oAddingVideo, uoSelectedVideo?.url, fSetVideoProperty, fAddVideo, fAlterVideo]
  );

  const hOnStepChangeHandler = useCallback(
    (sDirection: "next" | "back") => {
      return (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (sDirection === "back") {
          return setNCurrentStep((state) => (state > 0 ? state - 1 : state));
        }

        const { title } = oAddingVideo;
        switch (nCurrentStep) {
          case 0: {
            const bIsTitleCorrect = typeof title === "string" && !exEmpty.test(title);
            if (!bIsTitleCorrect) {
              const sError = `Sorry, You didn't fill the requierement to continue, ${S_FIELD_ERROR.replace(
                "{{field}}",
                "title"
              )}`;

              return setUOError(new NetworkError(sError, "UNKNOWN"));
            }

            break;
          }
        }

        setUOError(void 0);
        setNCurrentStep((state) => (state < steps.length ? state + 1 : state));
        fSetVideoProperty("nCurrentStep")(nCurrentStep + 1);
      };
    },
    [nCurrentStep, oAddingVideo, fSetVideoProperty]
  );

  const hOnCancelClickHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const oAddingVideoAction: IReduxAction = {
        type: "SET_ADDING_VIDEO",
        oPayload: {
          oVideo: {
            description: "",
            nCurrentStep: 0,
            sID: v1(),
            title: "",
          },
        },
      };
      const oSelectVideoAction: IReduxAction = {
        type: "SET_SELECTED_VIDEO",
        oPayload: { uoVideo: void 0 },
      };
      dispatch(oSelectVideoAction);
      dispatch(oAddingVideoAction);
      history.push(fVideosRoute());
    },
    [dispatch, history]
  );

  const hOnAddNewVideoClickHandler = useCallback(
    (event) => {
      event.stopPropagation();
      const oAddingVideoAction: IReduxAction = {
        type: "SET_ADDING_VIDEO",
        oPayload: {
          oVideo: {
            sID: v1(),
            description: "",
            title: "",
            nCurrentStep: 0,
          } as IVideoAdd,
        },
      };
      const oSelectVideoAction: IReduxAction = {
        type: "SET_SELECTED_VIDEO",
        oPayload: { uoVideo: void 0 },
      };
      dispatch(oSelectVideoAction);
      dispatch(oAddingVideoAction);
      setNCurrentStep(0);
      history.push(fAddVideoRoute());
    },
    [history, dispatch]
  );

  const hOnVideosPageClickHandler = useCallback(() => {
    const oAddingVideoAction: IReduxAction = {
      type: "SET_ADDING_VIDEO",
      oPayload: {
        oVideo: {
          sID: v1(),
          description: "",
          title: "",
          nCurrentStep: 0,
        } as IVideoAdd,
      },
    };
    const oSelectVideoAction: IReduxAction = {
      type: "SET_SELECTED_VIDEO",
      oPayload: { uoVideo: void 0 },
    };
    dispatch(oSelectVideoAction);
    dispatch(oAddingVideoAction);
    history.push(fVideosRoute());
  }, [history, dispatch]);

  const hOnRetreiveVideoHandler = useCallback(
    async (oEvent?: React.MouseEvent<HTMLButtonElement>) => {
      oEvent?.stopPropagation();
      setUOError(void 0);
      setBIsLoadingError(false);
      const oSelectAction: IReduxAction = {
        type: "SET_SELECTED_VIDEO",
        oPayload: { uoVideo: void 0 },
      };
      dispatch(oSelectAction);
      try {
        const oVideo = (await fGetVideo(sVideoID)) as IVideo;
        const oVideoAdd: IVideoAdd = {
          sID: oVideo.id,
          description: oVideo.description,
          title: oVideo.title,
          nCurrentStep: 0,
        };
        const oAddingVideoAction: IReduxAction = {
          type: "SET_ADDING_VIDEO",
          oPayload: { oVideo: oVideoAdd },
        };
        const oSelectVideoAction: IReduxAction = {
          type: "SET_SELECTED_VIDEO",
          oPayload: { uoVideo: oVideo },
        };
        dispatch(oAddingVideoAction);
        dispatch(oSelectVideoAction);
      } catch (oError) {
        const oVideoSelectedAction: IReduxAction = {
          type: "SET_SELECTED_VIDEO",
          oPayload: { uoVideo: void 0 },
        };
        dispatch(oVideoSelectedAction);
        setUOError(oError);
        setBIsLoadingError(true);
      }
    },
    [sVideoID, dispatch, fGetVideo]
  );

  useEffect(() => {
    if (bIsEditingVideo && nCurrentStep === 0) {
      hOnRetreiveVideoHandler();

      return;
    }
  }, [bIsEditingVideo, sVideoID, nCurrentStep, hOnRetreiveVideoHandler]);

  useEffect(() => {
    if (bIsEditingVideo && sVideoID.toString() !== oAddingVideo.sID.toString()) {
      hOnRetreiveVideoHandler();
    }
  }, [bIsEditingVideo, sVideoID, oAddingVideo, hOnRetreiveVideoHandler]);

  useEffect(() => {
    if (!bIsEditingVideo && typeof uoSelectedVideo !== "undefined" && bLoadingVideo) {
      history.push(fGoVideoEditRoute(uoSelectedVideo.id));

      return;
    }

    if (!bIsEditingVideo && typeof uoSelectedVideo !== "undefined" && !bLoadingVideo && nCurrentStep < steps.length) {
      const oSelectVideoAction: IReduxAction = {
        type: "SET_SELECTED_VIDEO",
        oPayload: { uoVideo: void 0 },
      };
      const oAddingVideoAction: IReduxAction = {
        type: "SET_ADDING_VIDEO",
        oPayload: {
          oVideo: {
            description: "",
            nCurrentStep: 0,
            sID: v1(),
            title: "",
          },
        },
      };
      dispatch(oAddingVideoAction);
      dispatch(oSelectVideoAction);
    }
  }, [bIsEditingVideo, uoSelectedVideo, bLoadingVideo, nCurrentStep, history, dispatch]);

  useEffect(() => {
    if (nCurrentStep !== oAddingVideo.nCurrentStep) {
      setNCurrentStep(oAddingVideo.nCurrentStep);
    }
  }, [oAddingVideo, nCurrentStep]);

  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={6} md={8} className={classes.container}>
        {/** Add or modify */}
        <Loader bLoading={bLoadingVideo && bIsEditingVideo && !bIsUploading} ubHiddeChildren={true}>
          <Grid container>
            <Switcher bCondition={!(typeof uoError === "object" && bIsLoadingError)}>
              <Grid item xs={12}>
                <Paper variant="outlined" className={bLoadingVideo ? classes.paperWithLoading : classes.paper}>
                  <Loader
                    bLoading={bLoadingVideo && bIsUploading}
                    ubProgressBar={bIsUploading}
                    unProgressPercent={oUploadVideo?.nProgressPercent}
                    usTitle={bIsUploading ? "Uploading, Please Wait..." : void 0}
                  >
                    <Grid container>
                      <Switcher bCondition={typeof uoError === "undefined" || uoError.issue === "UNKNOWN"}>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography component="h1" variant="h3" align="center" className="small-caps">
                                {/** Editing titles */}
                                <Switcher bCondition={bIsEditingVideo}>
                                  {nCurrentStep === steps.length ? "Successfuly Modified" : "Modify Video"}
                                </Switcher>
                                {/** Adding titles */}
                                <Switcher bCondition={!bIsEditingVideo}>
                                  {nCurrentStep === steps.length ? "Successfuly Added" : "Add Video"}
                                </Switcher>
                              </Typography>
                            </Grid>
                            {/** Error while operation */}
                            {typeof uoError === "object" && uoError.issue === "UNKNOWN" && (
                              <Grid item xs={12} className={classes.alert}>
                                <Alert severity="error" variant="filled">
                                  <Typography>{uoError.message}</Typography>
                                </Alert>
                              </Grid>
                            )}
                            {/** Steppes */}
                            {nCurrentStep !== steps.length && (
                              <Grid item xs={12}>
                                <Stepper activeStep={nCurrentStep} className={classes.stepper}>
                                  {steps.map((label) => (
                                    <Step key={label}>
                                      <StepLabel>{label}</StepLabel>
                                    </Step>
                                  ))}
                                </Stepper>
                              </Grid>
                            )}
                            {/** Sections */}
                            <Grid item xs={12}>
                              {nCurrentStep === 0 && <GeneralVideoDetails />}
                              {nCurrentStep === 1 && <SelectVideoFile />}
                              {nCurrentStep === steps.length && (
                                <SuccessfulAdded
                                  sTitle={
                                    bIsEditingVideo
                                      ? "Modifications have been saved successfuly"
                                      : "Video has been added successfuly"
                                  }
                                />
                              )}
                            </Grid>
                            <Grid item xs={12} className={classes.controls}>
                              <Grid container justify="flex-end">
                                {/** Cancel button */}
                                <Switcher bCondition={nCurrentStep < steps.length}>
                                  <Grid item className={classes.buttonControls}>
                                    <Button variant="contained" onClick={hOnCancelClickHandler} color="secondary">
                                      cancel
                                    </Button>
                                  </Grid>
                                </Switcher>
                                {/** Back button */}
                                <Switcher bCondition={nCurrentStep > 0 && nCurrentStep < steps.length}>
                                  <Grid item className={classes.buttonControls}>
                                    <Button
                                      variant="contained"
                                      onClick={hOnStepChangeHandler("back")}
                                      color="secondary"
                                    >
                                      Back
                                    </Button>
                                  </Grid>
                                </Switcher>
                                {/** Next button */}
                                <Switcher bCondition={nCurrentStep < steps.length - 1}>
                                  <Grid item className={classes.buttonControls}>
                                    <Button variant="contained" onClick={hOnStepChangeHandler("next")} color="primary">
                                      Next
                                    </Button>
                                  </Grid>
                                </Switcher>
                                {/** Add Video */}
                                <Switcher bCondition={nCurrentStep === steps.length - 1}>
                                  <Grid item className={classes.buttonControls}>
                                    {/** Confirm save */}
                                    <Switcher bCondition={bIsEditingVideo}>
                                      <Button
                                        variant="contained"
                                        onClick={hOnAddClickHandler("modify")}
                                        color="primary"
                                      >
                                        Save Modification
                                      </Button>
                                      {/** Adding confirm */}
                                    </Switcher>
                                    <Switcher bCondition={!bIsEditingVideo}>
                                      <Button variant="contained" onClick={hOnAddClickHandler("add")} color="primary">
                                        Add Video
                                      </Button>
                                    </Switcher>
                                  </Grid>
                                </Switcher>
                                {/** Finished */}
                                <Switcher bCondition={nCurrentStep === steps.length}>
                                  <Grid item xs={12}>
                                    <Grid container justify="space-around">
                                      <Grid item xs={5}>
                                        <Button
                                          fullWidth
                                          color="secondary"
                                          variant="contained"
                                          onClick={hOnAddNewVideoClickHandler}
                                        >
                                          Add new Video
                                        </Button>
                                      </Grid>
                                      <Grid item xs={5}>
                                        <Button
                                          fullWidth
                                          color="primary"
                                          variant="contained"
                                          onClick={hOnVideosPageClickHandler}
                                        >
                                          Videos page
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Switcher>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Switcher>
                      <Switcher bCondition={typeof uoError === "object" && uoError.issue !== "UNKNOWN"}>
                        <Grid item xs={12}>
                          {typeof uoError === "object" && (
                            <NetworkOperationFailed
                              oError={uoError}
                              sBadRequestButton="Try again"
                              sNotFoundButton="Videos page"
                              sServerIssueButton="Try again"
                              sUnauthorizedButton="Videos page"
                              hOnServerIssueClickHandler={hOnAddClickHandler(bIsEditingVideo ? "modify" : "add")}
                              hOnBadRequestClickHandler={hOnAddClickHandler(bIsEditingVideo ? "modify" : "add")}
                              hOnNotFoundClickHandler={hOnVideosPageClickHandler}
                              hOnUnauthorizedClickHandler={hOnVideosPageClickHandler}
                            />
                          )}
                        </Grid>
                      </Switcher>
                    </Grid>
                  </Loader>
                </Paper>
              </Grid>
            </Switcher>
            <Switcher bCondition={typeof uoError === "object" && bIsLoadingError}>
              <Grid item xs={12}>
                {typeof uoError === "object" && (
                  <NetworkOperationFailed
                    oError={uoError!}
                    sBadRequestButton={"Try again"}
                    sNotFoundButton={"Videos Page"}
                    sServerIssueButton={"Try again"}
                    sUnauthorizedButton={"Videos page"}
                    hOnBadRequestClickHandler={hOnRetreiveVideoHandler}
                    hOnNotFoundClickHandler={hOnVideosPageClickHandler}
                    hOnServerIssueClickHandler={hOnRetreiveVideoHandler}
                    hOnUnauthorizedClickHandler={hOnVideosPageClickHandler}
                  />
                )}
              </Grid>
            </Switcher>
          </Grid>
        </Loader>
      </Grid>
    </Grid>
  );
};

export default React.memo(AddEditVideo);
