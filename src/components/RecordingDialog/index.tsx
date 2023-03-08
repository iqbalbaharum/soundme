import bigmic from '../../assets/icon/bigmic.png'
import voice1 from '../../assets/img/Vector.png'
import mute from '../../assets/icon/mute.png'
import { useRef, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Waveform from 'components/Waveform'
import { useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import Recording from './Recording'
import CountdownTimer from './CountDownTimer'
import StartRecording from './StartRecording'
import Upload from './Upload'
import { AudioState, PlayerState } from 'lib'
interface RecordingDialogProp {
  dataKey: String
  isOpened: boolean
  onDialogClosed: () => void
}

export enum RecordingDialogState {
  START,
  COUNTDOWN,
  RECORD,
  UPLOAD,
  FINISH,
}

const RecordingDialog = (prop: RecordingDialogProp) => {
  const [state, setState] = useState<RecordingDialogState>(RecordingDialogState.START)
  const [audioData, setAudioData] = useState({
    blob: null,
    url: '',
  })
  const [filteredData, setFilteredData] = useState<Array<AudioState>>([])
  const { address } = useAccount()

  const onHandleRecordClicked = () => {
    setState(RecordingDialogState.COUNTDOWN)
  }

  const onHandleConfirmClicked = () => {
    prop.onDialogClosed()
  }

  const onRecordingFinished = () => {
    if (audioData) {
      setState(RecordingDialogState.UPLOAD)
    } else {
      setState(RecordingDialogState.START)
    }
  }

  useEffect(() => {
    const filtered = []

    filtered.push({
      key: address,
      data: '',
      isMuted: false,
      playerState: PlayerState.STOP,
    })

    setFilteredData(filtered)
  }, [address])

  const onToggleSound = (state: AudioState) => {
    const index = filteredData.findIndex(item => item.key === state.key)
    const updatedData = [...filteredData]

    updatedData[index] = {
      ...updatedData[index],
      isMuted: !state.isMuted,
    }

    setFilteredData(updatedData)
  }

  return (
    <>
      <div
        className={classNames('fixed inset-0 z-10 overflow-y-auto', {
          hidden: !prop.isOpened,
        })}
      >
        <div className="flex min-h-screen items-center justify-center px-4 py-4 text-center">
          <div className="border-gradient sm: inline-block w-full transform overflow-hidden rounded-md bg-[#DE296A] text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle md:max-w-7xl">
            <div className="justify-between">
              <div className="">
                <div className="flex justify-end">
                  <div className="p-3 text-white">
                    <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={() => prop.onDialogClosed()} />
                  </div>
                </div>
                <div className="">
                  <div className="border-1 m-1 h-[180px] rounded bg-black p-2 text-left">
                    <div className="font-sm absolute inline-block whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-black">
                      {address}
                    </div>
                    <div className="flex h-full w-full items-center justify-center">
                      {state == RecordingDialogState.START && (
                        <StartRecording
                          onHandleStartRecordingClicked={() => setState(RecordingDialogState.COUNTDOWN)}
                        />
                      )}
                      {state === RecordingDialogState.COUNTDOWN && (
                        <CountdownTimer onCountdownFinish={() => setState(RecordingDialogState.RECORD)} />
                      )}
                      {state === RecordingDialogState.RECORD && (
                        <Recording
                          state={state}
                          onHandleStopRecordingClicked={() => onRecordingFinished()}
                          setAudioData={setAudioData}
                        />
                      )}
                      {state === RecordingDialogState.UPLOAD && (
                        <div className="w-full items-center justify-center">
                          {audioData.url && (
                            <Waveform
                              url={audioData.url as string}
                              playerState={filteredData[filteredData.length - 1].playerState}
                              isMuted={filteredData[filteredData.length - 1].isMuted}
                              onToggleSound={() => onToggleSound(filteredData[filteredData.length - 1])}
                            />
                          )}
                          <Upload
                            audioData={audioData}
                            dataKey={`1`}
                            onHandleConfirmClicked={() => onHandleConfirmClicked()}
                            onHandleRecordClicked={() => onHandleRecordClicked()}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {!audioUrl && (
        <div className="relative">
          <div className="absolute left-[6.5rem] inline-block h-[93%] border-l-2 border-[#D45BFF]" />
          <div className="ml-auto h-16 w-[84.2%] bg-[#595959]" />
          <div className="flex w-full flex-col  items-center justify-center bg-black pt-2 pb-8 ">
            <div className="flex w-full flex-row items-center justify-end gap-x-2 pr-2">
              <p className="Inter text-sm font-medium text-[#CCCCCC]">Collaboration_1</p>
              <img src={mute.src} alt="Mute" className="h-auto w-6" />
            </div>

            <div className="box-shadow relative h-40 w-40 rounded-full bg-[#FF3535] py-2">
              <button type="button" onClick={handleStop}>
                <div className="absolute top-2 left-2 h-36 w-36 rounded-full border-4 border-black border-opacity-50 bg-[#FF3535] ">
                  <div className="flex w-full justify-center">
                    <img src={bigmic.src} alt="Mic" className="absolute top-[1.2rem] left-[2.1rem] h-auto w-16" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}

export default RecordingDialog
