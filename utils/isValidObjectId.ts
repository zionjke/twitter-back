import { mongoose } from '../core/db';

export const isValidObjectId = mongoose.Types.ObjectId.isValid;  // проверка на корректный ID
