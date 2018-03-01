const initialState = {
    ACTOR: "",
    ACTRESS: "",
    ADAPTED_SCREENPLAY: "",
    ANIMATED_FEATURE: "",
    ANIMATED_SHORT: "",
    BEST_PICTURE: "",
    CINEMATOGRAPHY: "",
    COSTUMES: "",
    DIRECTING: "",
    DOCUMENTARY_FEATURE: "",
    DOCUMENTARY_SHORT: "",
    EDITING: "",
    FOREIGN_LANGUAGE: "",
    LIVE_ACTION_SHORT: "",
    MAKEUP_AND_HAIRSTYLING: "",
    ORIGINAL_SCREENPLAY: "",
    ORIGINAL_SONG: "",
    PRODUCTION_DESIGN: "",
    SCORE: "",
    SOUND_EDITING: "",
    SOUND_MIXING: "",
    SUPPORTING_ACTOR: "",
    SUPPORTING_ACTRESS: "",
    VISUAL_EFFECTS: ""
}

export default (state=initialState, action) => {
  switch(action.type)
  {
    case 'SET_RESULTS':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }

}
