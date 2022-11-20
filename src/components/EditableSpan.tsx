import React, { useEffect, useState } from "react";

type EditableSpanProps = {
    setParentValue: Function,
    value: string
};

function EditableSpan(props: EditableSpanProps) {

    const [value, setValue] = useState<string>(props.value);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onChange = function(e: React.FormEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    };

    const onKeyDown = function(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    }

    const onBlur = function() {
        setEditing(false);
        props.setParentValue(value);
    };

    const onClick = function() {
        setEditing(true);
    };

    return editing ?
    (
        <input value={value} onBlur={onBlur} onChange={onChange} onKeyDown={onKeyDown}>
        </input>
    ) :
    (
        <span onClick={onClick}>
            {value}
        </span>
    );
}

export default EditableSpan;