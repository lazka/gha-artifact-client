import jsdoc from 'eslint-plugin-jsdoc'
import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['node_modules/']
  },
  js.configs.recommended,
  jsdoc.configs['flat/recommended'],
  {
    plugins: {
      jsdoc
    },
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'jsdoc/require-jsdoc': 0,
      'jsdoc/require-param-description': 0,
      'jsdoc/require-property-description': 0,
      'jsdoc/require-returns-description': 0
    }
  }
]
