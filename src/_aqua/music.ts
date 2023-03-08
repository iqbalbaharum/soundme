/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.9.4
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
 

export function generate_block(
    key: string,
    public_key: string,
    dt: string,
    config?: {ttl?: number}
): Promise<string>;

export function generate_block(
    peer: FluencePeer,
    key: string,
    public_key: string,
    dt: string,
    config?: {ttl?: number}
): Promise<string>;

export function generate_block(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "key") [] key)
                         )
                         (call %init_peer_id% ("getDataSrv" "public_key") [] public_key)
                        )
                        (call %init_peer_id% ("getDataSrv" "dt") [] dt)
                       )
                       (xor
                        (call -relay- ("block_formatter" "serialize") [public_key dt ""] serialize_dt)
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [serialize_dt])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction$$(
        args,
        {
    "functionName" : "generate_block",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "key" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "public_key" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "dt" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "scalar",
                    "name" : "string"
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

 

export function add_beat(
    key: string,
    public_key: string,
    content: string,
    signature: string,
    config?: {ttl?: number}
): Promise<void>;

export function add_beat(
    peer: FluencePeer,
    key: string,
    public_key: string,
    content: string,
    signature: string,
    config?: {ttl?: number}
): Promise<void>;

export function add_beat(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "key") [] key)
                          )
                          (call %init_peer_id% ("getDataSrv" "public_key") [] public_key)
                         )
                         (call %init_peer_id% ("getDataSrv" "content") [] content)
                        )
                        (call %init_peer_id% ("getDataSrv" "signature") [] signature)
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (seq
                        (seq
                         (seq
                          (seq
                           (call "12D3KooWHBG9oaVx4i3vi6c1rSBUm7MLBmyGmmbHoZ23pmjDCnvK" ("9a38b271-d738-44a5-a68e-fbf79f553040" "get_latest_record_by_pk_and_key") [key public_key] dht)
                           (null)
                          )
                          (call "12D3KooWHBG9oaVx4i3vi6c1rSBUm7MLBmyGmmbHoZ23pmjDCnvK" ("block_formatter" "serialize") [dht.$.alias! content dht.$.cid!] formatted)
                         )
                         (call "12D3KooWHBG9oaVx4i3vi6c1rSBUm7MLBmyGmmbHoZ23pmjDCnvK" ("ipfs_dag" "put") [formatted "" 0] result)
                        )
                        (xor
                         (mismatch dht.$.cid! ""
                          (xor
                           (seq
                            (seq
                             (null)
                             (call "12D3KooWHBG9oaVx4i3vi6c1rSBUm7MLBmyGmmbHoZ23pmjDCnvK" ("9a38b271-d738-44a5-a68e-fbf79f553040" "insert") [key dht.$.alias! result.$.cid! public_key signature content "secp256k1"])
                            )
                            (call -relay- ("op" "noop") [])
                           )
                           (seq
                            (call -relay- ("op" "noop") [])
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                          )
                         )
                         (seq
                          (seq
                           (call -relay- ("op" "noop") [])
                           (call "12D3KooWHBG9oaVx4i3vi6c1rSBUm7MLBmyGmmbHoZ23pmjDCnvK" ("9a38b271-d738-44a5-a68e-fbf79f553040" "insert") [key "" result.$.cid! public_key signature content "secp256k1"])
                          )
                          (call -relay- ("op" "noop") [])
                         )
                        )
                       )
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
                "key" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "public_key" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "content" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "signature" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "nil"
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
