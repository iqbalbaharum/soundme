export function getSongLength(arrayOfAudioBuffers: AudioBuffer[]) {
  let totalLength = 0

  for (let track of arrayOfAudioBuffers) {
    if (track.length > totalLength) {
      totalLength = track.length
    }
  }

  return totalLength
}

export function mixAudioBuffer(
  bufferList: AudioBuffer[],
  totalLength: number,
  numberOfChannels = 2,
  context: AudioContext
) {
  //create a buffer using the totalLength and sampleRate of the first buffer node
  let finalMix = context.createBuffer(numberOfChannels, totalLength, bufferList[0].sampleRate)

  //first loop for buffer list
  for (let i = 0; i < bufferList.length; i++) {
    // second loop for each channel ie. left and right
    for (let channel = 0; channel < numberOfChannels; channel++) {
      //here we get a reference to the final mix buffer data
      let buffer = finalMix.getChannelData(channel)

      //last is loop for updating/summing the track buffer with the final mix buffer
      for (let j = 0; j < bufferList[i].length; j++) {
        buffer[j] += bufferList[i].getChannelData(channel)[j]
      }
    }
  }

  return finalMix
}

export const createMixedAudio = async (audioContext: AudioContext, dataKey: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LINEAGE_NODE_URL}metadata/${dataKey}`)
  let metadata = await res.json()

  const urls = []
  for (const [key, value] of Object.entries(metadata)) {
    if (key.startsWith('0x')) urls.push(value)
  }

  let promises = urls.map(url =>
    fetch(url as URL)
      .then(response => response.arrayBuffer())
      .then(buffer => audioContext.decodeAudioData(buffer))
  )

  let buffers = await Promise.all(promises)

  const songLength = getSongLength(buffers)
  let mixed = mixAudioBuffer(buffers, songLength, 1, audioContext)

  return mixed
}
export function classNames(...classes: (false | null | undefined | string)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shortenAddress(address: string, n: number = 4) {
  if (!address) return ''
  if (n < 1 || n >= address?.length) {
    return address
  }

  const firstNChars = address.slice(0, n)
  const lastNChars = address.slice(-n)

  return `${firstNChars}...${lastNChars}`
}
