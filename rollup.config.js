import rollupTypescript from 'rollup-plugin-typescript'
import typescript from 'typescript'
export default {
  entry: 'src/index.ts',
  dest: 'dist/bitmap.js',
  format: 'umd',
  moduleName: 'Bitmap',
  plugins: [
    rollupTypescript({
      typescript
    })
  ]
}
