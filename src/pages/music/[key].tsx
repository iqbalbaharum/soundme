import { useEffect, useRef, useState } from 'react'

//@ts-ignore
import AudioMotionAnalyzer from '../../../node_modules/audiomotion-analyzer/src/audioMotion-analyzer' 
import { PlayerState } from 'lib'
import { createMixedAudio } from 'utils/'
import audioBuffertoWav from 'audiobuffer-to-wav'
import { PlayIcon, StopIcon, LoadingSpinner } from 'components/Icons/icons'
import { useRouter } from 'next/router'

export default function OpenseaPreview() {
  const router = useRouter()

  const [audioContext] = useState(new AudioContext())
  const [mixedAudio, setMixedAudio] = useState<AudioBuffer>()

  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.STOP)

  const [dataKey, setDataKey] = useState('')
  const [tokenId, setTokenId] = useState('')

  function playAudio() {
    htmlAudioElementRef.current?.play()
  }

  function stopAudio() {
    htmlAudioElementRef.current?.pause()
  }

  useEffect(() => {
    const getMixedAudio = async (dataKey: string) => {
      const mixed = await createMixedAudio(audioContext, dataKey)
      setMixedAudio(mixed)
    }

    if (!dataKey && !tokenId) {
      let regex = new RegExp('.{1,' + 64 + '}', 'g')

      if(!router.query.key) return
      let result = router.query.key.toString().match(regex)

      if (result && result[0] && result[1]){
        setDataKey(result[0])
        setTokenId(result[1])
        getMixedAudio(result[0])
      }
    }
  }, [router, dataKey, tokenId])

  const container = useRef<HTMLDivElement>(null)
  const htmlAudioElementRef = useRef<HTMLAudioElement>(null)
  const audioMotion = useRef<AudioMotionAnalyzer>()

  useEffect(() => {
    if(!htmlAudioElementRef.current) return

    if (mixedAudio) {
      const blob = new Blob([audioBuffertoWav(mixedAudio)], { type: 'audio/wav' })
      const url = window.URL.createObjectURL(blob)
   
      htmlAudioElementRef.current.src = url
    }

    if (container.current && htmlAudioElementRef.current && !audioMotion.current) {
      htmlAudioElementRef.current.onpause = () => {
        setPlayerState(PlayerState.STOP)
      }
      htmlAudioElementRef.current.onplay = () => {
        setPlayerState(PlayerState.PLAY)
      }

      audioMotion.current = new AudioMotionAnalyzer(container.current, {
        source: htmlAudioElementRef.current,
        fsElement: container.current,
        mode: 1,
        lineWidth: 1.5,
        fillAlpha: 0.5,
        smoothing: 0.5,
        showPeaks: false,
        radial: true,
        overlay: true,
        bgAlpha: 0,
        spinSpeed: 5,
        minDecibels: -105,
        showScaleX: false,
      })

      const options = {
        colorStops: ['#7224A7', '#FF3065'],
      }

      audioMotion.current.registerGradient('colla-vibrant-orchid', options)
      audioMotion.current.gradient = 'colla-vibrant-orchid'

      audioMotion.current.setFreqRange(500, 10000)
      audioMotion.current.setCanvasSize(250, 250)
    }
  }, [mixedAudio])

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <main>
        {mixedAudio ? (
          <div className="gradient-border mx-4">
            <div className="flex items-center justify-center ">
              <div id="container" ref={container} />
              <audio id="audio" ref={htmlAudioElementRef} />

              {playerState === PlayerState.STOP && (
                <button
                  className="absolute flex h-[30px] w-[30px] items-center justify-center rounded-full border-stone-600 bg-gradient-to-b from-[#7224A7] to-[#FF3065] transition duration-500 ease-in-out md:hover:scale-105"
                  onClick={() => playAudio()}
                >
                  <PlayIcon />
                </button>
              )}

              {playerState === PlayerState.PLAY && (
                <button
                  className="absolute rounded-full border-stone-600 transition duration-500 ease-in-out md:hover:scale-105"
                  onClick={() => stopAudio()}
                >
                  <StopIcon />
                </button>
              )}
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </main>
    </div>
  )
}
