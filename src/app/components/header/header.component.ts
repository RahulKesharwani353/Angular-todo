import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  stateService = inject(StateService);
  searchControl = new FormControl('');
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.stateService.searchSubject.next(value || '');
    });
  }
}