import React from 'react';
import TextArea from '../../../Common/TextArea/TextArea'
import InputFileButton from '../../../Common/InputFileButton/InputFileButton'
import DeleteButton from '../../../Common/DeleteButton/DeleteButton'
import './PostBodyCreating.css'

class PostCreate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         objects: []
        };
    }
  
  
    textBlockChange(event) {
        let objects = this.state.objects;
        objects[event.target.name].text = event.target.value;
        this.setState({ objects });
        this.props.update(objects)
    }
  
    textBlock = (i) => (
        <TextArea 
            name={i}
            value={this.state.objects[i].text}
            onChange={(e) => this.textBlockChange(e)}
        />
    )  

    imageBlock = (i) => (
        <img src={this.state.objects[i].previewUrl} alt=""/>
    )
    
    deleteObject(i) {
        let objects = this.state.objects;
        objects.splice(i, 1);
        this.setState({ objects });
        this.props.update(objects)
    }

    deleteButton(position) {
        return <DeleteButton onClick={()=>this.deleteObject(position)} />
    }
  
    addTextBlock(position) {
        let objects = this.state.objects;
        objects.splice(position + 1, 0, { 
          type: 'text',  
          text: '',
          file: null
        });
        this.setState({ objects });
    }
  
    addImage(e) {
        e.preventDefault();    
        let reader = new FileReader();
        const file = e.target.files[0];
        const position = e.target.name;

        reader.onloadend = () => {
            let objects = this.state.objects;
            console.log(this.state.imagePositionCrutch)
            objects.splice(+position + 1, 0, { 
                type: 'image',  
                file,
                previewUrl: reader.result
            });
            this.setState({ objects });
        }
        reader.readAsDataURL(file)
    }

    addingButtons(position){
        return (
            <div className="addingContainer">
                <div className='addingButtons'>
                    <button 
                        onClick={()=>this.addTextBlock(position)}>
                        Add Text
                    </button>
                    <InputFileButton 
                        name={position} 
                        onChange={(e)=>this.addImage(e)}
                    />    
                </div>
            </div>
        )
    }


    objectReturner(object, position) {
        return(
            object.type === 'text' ? this.textBlock(position) :
            object.type === 'image' && this.imageBlock(position)
        )
    }
  
    render() {
        return (
            <div className='postBodyCreating'>
                
                    {(this.state.objects.length === 0) && this.addingButtons(-1)}
                    {this.state.objects.map((object, index) => 
                        <div className='contentBlock' key={index.toString()}>
                            <div className='contentContainer'>
                                {this.objectReturner(object,index)}
                                {this.deleteButton(index)}
                            </div>
                            
                            {this.addingButtons(index)}
                        </div>)
                    }
            </div>
        )
    }
}

export default PostCreate