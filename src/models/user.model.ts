import { UserDocument } from './../types/user.types';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';
import { randomBytes,createHash } from 'crypto';


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default:"user"
    },
    isBlocked: {
        type: Boolean,
        default:false
    },
    cart: {
        type: Array,
        default:[]
    },
    address: {
        type: String,
    },
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Products"
        }
    ],
    refreshToken: {
        type:String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires:Date
}, {
    timestamps:true
});

userSchema.pre('save', async function (next) {
    let user = this as UserDocument

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<Boolean> {
    let user = this as UserDocument
    return bcrypt.compare(candidatePassword,user.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = randomBytes(32).toString('hex');
    this.passwordResetToken = createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 30 * 60 * 1000// 10 minutes
    
    return resetToken;
};



export const userModel = mongoose.model<UserDocument>('user', userSchema);