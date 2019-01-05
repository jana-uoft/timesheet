import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  token: String
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  this.password = await hash(this.password, 10)
})

userSchema.methods.isValidPassword = function (loginPassword) {
  return compare(loginPassword, this.password)
}

export default mongoose.model('User', userSchema)
