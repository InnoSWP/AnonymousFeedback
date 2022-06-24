import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
export default {
    input: 'feedback.js',
    output: { file: 'feedback.bundle.js' },
    plugins: [
        resolve({ browser: true }),
        commonjs(),
    ]
};