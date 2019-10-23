import React from 'react';
import './TextArea.css'

function TextArea ({name, value, onChange, maxHeight}) {

    function textarea_resize(event) {
        const line_height = 15 ;
        const min_line_count = 2;
        var min_line_height = min_line_count * line_height;
        var obj = event.target;
        var div = document.getElementById(obj.id + '_div');
        div.innerHTML = obj.value;
        var obj_height = div.offsetHeight;
        if (event.keyCode === 1)
            obj_height += line_height;
        else if (obj_height < min_line_height)
            obj_height = min_line_height;
        obj.style.height = obj_height + 'px';
    }

    return (
        <div className="customTextarea">
            <textarea 
                id="text_area" 
                rows="2" 
                onKeyUp={textarea_resize}
                name={name}
                value={value}
                onChange={onChange}
                style={{ maxHeight }}>
            </textarea>
            <div id="text_area_div"></div>        
        </div>
    )
};

export default TextArea;