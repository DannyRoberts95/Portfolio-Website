import { MathComponent } from 'mathjax-react';
import React from 'react';

export default function PreviewEquation(props) {
    const { markdown } = props.value;
    if (!markdown) {
        console.log('No markdown found for embeded equation.');
        return null;
    }

    return <MathComponent tex={String.raw`${markdown}`} />;
}
