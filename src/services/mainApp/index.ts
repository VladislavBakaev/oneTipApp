import { store } from '../../redux/AppStore';
import { updateLoadingState } from '../../redux/actions/MainAppActions';

const setLoadingState = (payload: SetLoadingStatePayload) => {
  store.dispatch(updateLoadingState({ state: payload.state }))
}

export { setLoadingState }