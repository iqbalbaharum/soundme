/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.9.5
 *
 */
import { FluencePeer } from '@fluencelabs/fluence';
import type { CallParams$$ } from '@fluencelabs/fluence/dist/internal/compilerSupport/v4'
import {
    callFunction$$,
    registerService$$,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v4';


// Services

// Functions
 
export type Add_beatResult = { transaction_hash: string; }
export function add_beat(
    data_key: string,
    token_key: string,
    token_id: string,
    a: string,
    public_key: string,
    signature: string,
    d: string,
    config?: {ttl?: number}
): Promise<Add_beatResult>;

export function add_beat(
    peer: FluencePeer,
    data_key: string,
    token_key: string,
    token_id: string,
    a: string,
    public_key: string,
    signature: string,
    d: string,
    config?: {ttl?: number}
): Promise<Add_beatResult>;

export function add_beat(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                              (call %init_peer_id% ("getDataSrv" "data_key") [] data_key)
                             )
                             (call %init_peer_id% ("getDataSrv" "token_key") [] token_key)
                            )
                            (call %init_peer_id% ("getDataSrv" "token_id") [] token_id)
                           )
                           (call %init_peer_id% ("getDataSrv" "a") [] a)
                          )
                          (call %init_peer_id% ("getDataSrv" "public_key") [] public_key)
                         )
                         (call %init_peer_id% ("getDataSrv" "signature") [] signature)
                        )
                        (call %init_peer_id% ("getDataSrv" "d") [] d)
                       )
                       (xor
                        (call -relay- ("transaction" "send_transaction") [data_key token_key token_id a public_key signature d "metadata" 0] result)
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [result])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction$$(
        args,
        {
    "functionName" : "add_beat",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "data_key" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "token_key" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "token_id" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "a" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "public_key" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "signature" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "d" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "struct",
                    "name" : "FdbResult",
                    "fields" : {
                        "transaction_hash" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

/* eslint-enable */