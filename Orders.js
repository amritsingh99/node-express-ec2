import { EventEmitter } from 'events';

const _order_key = Symbol('key')
const _order_fname = Symbol('key')
const _order_length = Symbol('length')
const _order_width = Symbol('width')
const _order_pick = Symbol('pick')
const _order_repeat = Symbol('repeat')
const _order_client = Symbol('client')

export const order_keys = {
    _order_key,
    _order_fname,
    _order_length,
    _order_width,
    _order_pick,
    _order_repeat,
    _order_client
}

export default class Order {
    constructor(key, title, fname, length, width, pick, repeat, client) {
        this[_order_key] = key
        this[_order_fname] = fname
        this[_order_length] = length
        this[_order_width] = width
        this[_order_pick] = pick
        this[_order_repeat] = repeat
        this[_order_client] = client
    }
    get key() {
        return this[_note_key]
    }
}