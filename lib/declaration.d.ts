import Node, { NodeProps } from './node'

interface DeclarationRaws {
  /**
   * The space symbols before the node. It also stores `*`
   * and `_` symbols before the declaration (IE hack).
   */
  before?: string

  /**
   * The symbols between the property and value for declarations.
   */
  between?: string

  /**
   * The content of the important statement, if it is not just `!important`.
   */
  important?: string

  /**
   * Declaration value with comments.
   */
  value: {
    value: string
    raw: string
  }
}

export interface DeclarationProps {
  prop: string
  value: string
  raws?: DeclarationRaws
}

/**
 * Represents a CSS declaration.
 *
 * ```js
 * const root = postcss.parse('a { color: black }')
 * const decl = root.first.first
 * decl.type       //=> 'decl'
 * decl.toString() //=> ' color: black'
 * ```
 */
export default class Declaration extends Node {
  type: 'decl'
  raws: DeclarationRaws

  /**
   * The declaration's property name.
   *
   * ```js
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first.first
   * decl.prop //=> 'color'
   * ```
   */
  prop: string

  /**
   * The declaration’s value.
   *
   * This value will be cleaned of comments. If the source value contained
   * comments, those comments will be available in the `raws` property.
   * If you have not changed the value, the result of `decl.toString()`
   * will include the original raws value (comments and all).
   *
   * ```js
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first.first
   * decl.value //=> 'black'
   * ```
   */
  value: string

  /**
   * `true` if the declaration has an `!important` annotation.
   *
   * ```js
   * const root = postcss.parse('a { color: black !important; color: red }')
   * root.first.first.important //=> true
   * root.first.last.important  //=> undefined
   * ```
   */
  important: boolean

  constructor (defaults?: DeclarationProps)
  clone (overrides?: DeclarationProps): this
  cloneBefore (overrides?: DeclarationProps): this
  cloneAfter (overrides?: DeclarationProps): this
}