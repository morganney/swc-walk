import { mock } from 'node:test'
import assert from 'node:assert'
import { parseSync, type ParseOptions } from '@swc/core'
import { simple } from '../src/walk.js'
import { BaseVisitor } from '../src/baseVisitor.js'

export type Test = {
  type: keyof BaseVisitor<unknown>
  skip?: string
  code: string
  times?: number
  debug?: boolean
  parserOptions?: Partial<ParseOptions> & { isModule?: false }
}

const baseVisitor = new BaseVisitor()

export function given(options: Test): Test & { method: ReturnType<typeof mock.method> } {
  try {
    const ast = parseSync(options.code, {
      syntax: 'typescript',
      decorators: true,
      ...options.parserOptions,
    })

    if (options.debug) {
      global.console.debug(JSON.stringify(ast, null, 2))
    }

    const method = mock.method(baseVisitor, options.type)

    simple(ast, {}, baseVisitor)

    return { ...options, method }
  } catch (e) {
    if (options.debug) {
      global.console.error(e)
    }

    assert.fail(`Couldn't parse the code snippet for node ${options.type}`)
  }
}

export function expect(options: Test & { method: ReturnType<typeof mock.method> }) {
  return {
    toHaveBeenCalledTimes: (times: number) => {
      assert.equal(
        options.method.mock.callCount(),
        times,
        `Expected ${options.type} to be called ${times.toString()} times, but was called ${options.method.mock.callCount().toString()} times.`,
      )
    },
  }
}
