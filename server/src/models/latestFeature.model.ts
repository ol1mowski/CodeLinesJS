import mongoose, { Document, Schema } from 'mongoose';

export interface ILatestFeature extends Document {
  title: string;
  description: string;
  category: 'feature' | 'update' | 'improvement' | 'bugfix';
  version?: string;
  isActive: boolean;
  priority: number;
  releaseDate: Date;
  tags: string[];
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LatestFeatureSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Tytuł jest wymagany'],
      trim: true,
      maxlength: [100, 'Tytuł nie może być dłuższy niż 100 znaków'],
      minlength: [3, 'Tytuł musi mieć co najmniej 3 znaki'],
    },
    description: {
      type: String,
      required: [true, 'Opis jest wymagany'],
      trim: true,
      maxlength: [500, 'Opis nie może być dłuższy niż 500 znaków'],
      minlength: [10, 'Opis musi mieć co najmniej 10 znaków'],
    },
    category: {
      type: String,
      required: [true, 'Kategoria jest wymagana'],
      enum: {
        values: ['feature', 'update', 'improvement', 'bugfix'],
        message: 'Kategoria musi być jedną z: feature, update, improvement, bugfix',
      },
    },
    version: {
      type: String,
      trim: true,
      match: [/^\d+\.\d+\.\d+$/, 'Wersja musi być w formacie x.y.z'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      required: [true, 'Priorytet jest wymagany'],
      min: [1, 'Priorytet musi być co najmniej 1'],
      max: [10, 'Priorytet nie może być większy niż 10'],
      default: 5,
    },
    releaseDate: {
      type: Date,
      required: [true, 'Data wydania jest wymagana'],
      default: Date.now,
    },
    tags: {
      type: [String],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 5;
        },
        message: 'Maksymalnie 5 tagów jest dozwolone',
      },
      default: [],
    },
    icon: {
      type: String,
      trim: true,
      maxlength: [50, 'Ikona nie może być dłuższa niż 50 znaków'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indeksy dla lepszej wydajności
LatestFeatureSchema.index({ releaseDate: -1 });
LatestFeatureSchema.index({ isActive: 1, priority: -1 });
LatestFeatureSchema.index({ category: 1 });

// Virtual dla formatowania daty
LatestFeatureSchema.virtual('formattedReleaseDate').get(function (this: ILatestFeature) {
  return this.releaseDate.toLocaleDateString('pl-PL');
});

// Middleware pre-save
LatestFeatureSchema.pre('save', function (this: ILatestFeature, next) {
  if (this.isModified('title')) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }
  next();
});

export const LatestFeature = mongoose.model<ILatestFeature>('LatestFeature', LatestFeatureSchema);
