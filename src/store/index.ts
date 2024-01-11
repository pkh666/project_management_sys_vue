import { createPinia } from "pinia";
import type { App } from "vue";
import { reactive } from "vue";
const pinia = createPinia();

function registerStore(app: App<Element>) {
  //1.use piana
  app.use(pinia);
}
interface State {
  projectid: string;
}

const state: State = reactive({
  projectid: '1',
});

function setProjectId(projectId: string) {
  state.projectid = projectId;
}

export default registerStore;
export { state, setProjectId };
