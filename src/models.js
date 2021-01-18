/** @typedef {Object} OrdersRequest
 * @property {String} count
 * @property {String | null} next
 * @property {String | null} previous
 * @property {Array<Order>} results
 */

/** @typedef {Object} Order
 * @property {String} buyer
 * @property {OrderChannel} channel
 * @property {String} create_date
 * @property {String} created
 * @property {String} currency_code
 * @property {String} id
 * @property {Boolean} is_canceled
 * @property {Boolean} is_completed
 * @property {Boolean} is_disabled
 * @property {Boolean} is_open
 * @property {Boolean} is_paid
 * @property {Boolean} is_partially_shipped
 * @property {Boolean} is_refunded
 * @property {Boolean} is_shipped
 * @property {Boolean} is_viewed
 * @property {Boolean} is_visible
 * @property {Array<OrderItem>} items
 * @property {OrderMarketplaceUserAccount} marketplace_user_account
 * @property {String} order_id
 * @property {Number} total_price
 * @property {String} update_date
 */

/** @typedef {Object} OrderChannel
 *  @property {Number} domain
 *  @property {String} id
 *  @property {String} marketplace_user_account
 *  @property {String} name
 */

/** @typedef {Object} OrderItem
 * @property {String} currency
 * @property {String} id
 * @property {String} image
 * @property {Number} price
 * @property {Number} quantity
 * @property {String} sku
 * @property {String} title
 * @property {Number} total_price
 */

/** @typedef {Object} OrderMarketplaceUserAccount
 *  @property {String} id
 *  @property {Number} marketplace
 *  @property {String} marketplace_name
 *  @property {Number} user
 *  @property {String} username
 */
