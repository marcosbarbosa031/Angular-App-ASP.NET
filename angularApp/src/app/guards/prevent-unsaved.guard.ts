import { Injectable } from "@angular/core";
import { MemberEditComponent } from '../components/members';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  canDeactivate(components: MemberEditComponent) {
    if (components.editForm.dirty) {
      return confirm('Are you sure you want to exit this page? Any unsaved changes will be lost.')
    }
    return true;
  }
}
