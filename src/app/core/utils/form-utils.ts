import { AddTaskFormComponent } from "../../features/main/add-task-form/add-task-form.component";

export function isFormDisabledManuallyOrInvalidUtil(form: AddTaskFormComponent, isFormDisabled: boolean) {
    if (form && form.ngForm) {
      return !form.ngForm.valid || isFormDisabled;
    } else {
      return isFormDisabled;
    }
}