import mongoose from 'mongoose';

mongoose.connection.once('open', () => {
  console.log('MongoDB ready!')
})
mongoose.connection.on('error', err => {
  console.error(err)
})

export async function mongoConnect(url: string) {
  await mongoose.connect(url)
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}