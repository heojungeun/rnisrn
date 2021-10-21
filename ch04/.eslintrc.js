module.exports =  {
  root: true,
  parser:  '@typescript-eslint/parser',  
  plugins: ['@typescript-eslint', 'prettier'],
  extends:  [
    'airbnb-base',
    'plugin:react/recommended', // 리액트 추천 룰셋
    'plugin:@typescript-eslint/recommended', // 타입스크립트 추천 룰셋
    'prettier',
     // eslint의 typescript 포매팅 기능을 제거(eslint-config-prettier)
    //'prettier/@typescript-eslint',  
    // eslint의 포매팅 기능을 prettier로 사용함. 항상 마지막에 세팅 되어야 함.            
    'plugin:prettier/recommended'
  ],
  parserOptions:  {
    project: './ch04/tsconfig.json',
  },
  rules:  {
    // extends에서 적용한 룰셋을 덮어씌울 수 있습니다.
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    "import/no-unresolved": "off",
    'import/extensions': [ 
      'error', 'ignorePackages', 
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'never', }, 
    ],
  },
  settings:  {
    react:  {
      version:  'detect',  // eslint-plugin-react가 자동 리액트버전탐지
    },
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'], }, }
  }
}