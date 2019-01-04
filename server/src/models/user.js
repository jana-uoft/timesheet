import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  this.password = await hash(this.password, 10)
})

export default mongoose.model('User', userSchema)
