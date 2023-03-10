import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Waveform from 'components/Waveform'
import { ethers } from 'ethers'
import { useIpfs } from 'hooks/use-ipfs'
import { AudioState, PlayerState, SelectedAudio } from 'lib'
import { useEffect, useState } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import BN from 'bn.js'
import ConfirmButton from './ConfirmButton'

interface ForkDialogProp {
  tokenId: String
  dataKey: String
  isOpened: boolean
  onDialogClosed: () => void
  selectedAudios: SelectedAudio[]
}

const ForkDialog = (prop: ForkDialogProp) => {
  const [uploadedCid, setUplodedCid] = useState('')

  const ipfs = useIpfs()

  useEffect(() => {
    const uploadToIpfs = async () => {
      try {
        const cid = await ipfs.dag.put(prop.selectedAudios)
        setUplodedCid(cid.toString())
      } catch (e) {
        console.log(e)
      }
    }

    if (!uploadedCid) {
      uploadToIpfs()
    }
  }, [uploadedCid, ipfs, prop])

  return (
    <>
      <div
        className={classNames('fixed inset-0 z-10 overflow-y-auto', {
          hidden: !prop.isOpened,
        })}
      >
        <div className="flex min-h-screen items-center justify-center px-4 py-4 text-center">
          <div className="z-99 border-gradient inline-block transform overflow-hidden rounded-sm bg-black p-4 shadow-xl transition-all sm:w-full md:max-w-lg">
            <div className="">
              <div className="flex justify-end text-white">
                <XMarkIcon
                  className="h-6 w-6 cursor-pointer"
                  aria-hidden="true"
                  onClick={() => prop.onDialogClosed()}
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="Roboto mb-8 text-lg font-medium leading-6 text-[#DCDCDC]" id="modal-headline">
                Fork Sheet
              </h3>
              <div className="mt-2">
                <p className="Roboto text-xs text-[#DCDCDC]">
                  You are forking <b>{`${prop.selectedAudios.length}`} beat(s)</b>
                </p>
              </div>
              <div className="mt-6">
                {uploadedCid && <ConfirmButton cid={uploadedCid} onForkSuccess={() => prop.onDialogClosed()} />}
                <button className="bg-red-600 px-5 py-3 text-white" onClick={() => prop.onDialogClosed()}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForkDialog
