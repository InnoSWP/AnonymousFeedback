
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
export default {
    input: 'teacher-client.js',
    output: { file: 'teacher-bundle.js' },
    plugins: [
        resolve({ browser: true }),
        commonjs(),
    ]
};