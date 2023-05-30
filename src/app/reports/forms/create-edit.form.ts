import { FormControl, FormGroup, Validators } from '@angular/forms';

export const createEditGroup = new FormGroup({
  projectId: new FormControl('', [Validators.required]),
  hours: new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(45),
  ]),
});
