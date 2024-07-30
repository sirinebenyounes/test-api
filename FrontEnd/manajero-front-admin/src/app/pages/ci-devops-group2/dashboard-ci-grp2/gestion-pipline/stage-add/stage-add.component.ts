import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StageService } from '../../../../../services/stage.service';
import { Router } from '@angular/router';
import { Stage } from '../../../../../models/stage.model';
import { PipelineService } from '../../../../../services/pipeline.service';
import { Pipeline } from '../../../../../models/pipeline.model';

@Component({
  selector: 'ngx-stage-add',
  templateUrl: './stage-add.component.html',
  styleUrls: ['./stage-add.component.scss']
})
export class StageAddComponent implements OnInit {
  stageForm: FormGroup;
  pipelines: Pipeline[] = []; // Liste des pipelines disponibles

  constructor(
    private fb: FormBuilder,
    private stageService: StageService,
    private pipelineService: PipelineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.stageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      pipelineId: [''], // Le champ pipelineId est optionnel
      active: [false],
      status: ['']
    });

    // Récupération des pipelines disponibles
    this.pipelineService.getAllPipelines().subscribe(
      (pipelines: Pipeline[]) => {
        this.pipelines = pipelines;
      },
      error => console.error('Error fetching pipelines:', error)
    );
  }

  onSubmit(): void {
    if (this.stageForm.valid) {
      const stage: Stage = this.stageForm.value;
      this.stageService.createStage(stage).subscribe(
        () => this.router.navigate(['/stages']), // Redirect on success
        error => console.error('Error creating stage:', error) // Handle error
      );
    }
  }
}