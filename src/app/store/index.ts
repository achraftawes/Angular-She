import { TrainingState } from "./training/training.state";
import { TrainingManagementState } from "./training-management/training-management.state";

export const States = [TrainingState, TrainingManagementState];

export * from "./training/training.state";
export * from "./training-management/training-management.state";
