import React, {Component, Fragment} from "react";
import axios from 'axios';

import './add-images.css';
import Spinner from "../spinner/spinner";
import API from "../api/API"

class AddImages extends Component {

    state = {
        formControl: {
            imageName: {
                value: '',
                type: 'text',
                errorMessage: 'Допустимая длина картинки от 1 до 30 символов',
                valid: true,
                touched: false,
                validation: {
                    required: true,
                    maxLength: 30
                }
            }
        },
        toggleAlert: null,
        uploading: false,
        name: '',
        data: ''

    };

    handlerSubmit = event => {
        event.preventDefault();

        this.setState({
            uploading: true
        });

        const image = {
            name: this.state.name,
            data: this.state.data
        };
        axios.post(API.apiURL + "/Image/Send/Test", image)
            .then(res => {
                this.setState({
                    uploading: false,
                    toggleAlert: true,
                    data: ''
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    uploading: false,
                    toggleAlert: false
                });
            });

    };

    handlerChangeData = event => new Promise((resolve, reject) => {
        this.setState({
            toggleAlert: null
        });

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({
                name: file.name,
                data: reader.result
            });
        };
        reader.onerror = error => reject(error);
    });

// handlerChangeName = event => {
//     let formControl = {...this.state.formControl};
//     const control = {...formControl['imageName']};
//
//     control.value = event.target.value;
//     control.touched = true;
//     control.valid = this.validateControl(control.value, control.validation);
//
//     formControl['imageName'] = control;
//
//     this.setState({
//         formControl
//     });
//
//     console.log(this.state.formControl)
//
// };

// validateControl(value, validation) {
//     let isValid = true;
//
//     if (!validation) {
//         return true;
//     }
//
//     if (validation.required) {
//         isValid = value.trim() !== '' && isValid;
//     }
//
//     if (validation.maxLength) {
//         isValid = value.length <= validation.maxLength && isValid;
//     }
//
//
//     return isValid;
// }

    render() {
        let alert = null;

        if (this.state.toggleAlert) {
            alert = (
                <div className="alert  alert-success">
                    {/*<button type="button" className="close" data-dismiss="alert">&times;</button>*/}
                    <p><strong>Well done!</strong> You successfully uploaded the image.</p>
                </div>
            );
        } else if (!!this.state.toggleAlert) {
            alert = (
                <div className="alert alert-danger" role='alert'>
                    {/*<button type="button" className="close" data-dismiss="alert">&times;</button>*/}
                    <p><strong>Oh snap!</strong> The image didn't upload</p>
                </div>
            );
        }

        return (
            <Fragment>

                {alert}

                <form className='add-images' onSubmit={this.handlerSubmit}>

                    {
                        !this.state.uploading
                            ? <fieldset>
                                <legend>Add image</legend>
                                <div className="form-group">

                                    {/*<input*/}
                                    {/*type={this.state.formControl.imageName.type}*/}
                                    {/*value={this.state.formControl.imageName.value}*/}
                                    {/*className="form-control"*/}
                                    {/*placeholder="Enter name"*/}
                                    {/*onChange={this.handlerChangeName}*/}
                                    {/*/>*/}
                                    {/*{!this.state.formControl.imageName.valid*/}
                                    {/*? <small>{this.state.formControl.imageName.errorMessage}</small>*/}
                                    {/*: null*/}
                                    {/*}*/}

                                    <input type="file" className="form-control-file" id="exampleInputFile"
                                           aria-describedby="fileHelp" accept="image/*"
                                           onChange={this.handlerChangeData}
                                    />

                                    {this.state.data !== ''
                                        ? <img src={this.state.data} className='added-image' alt='kek'/>
                                        : null
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </fieldset>
                            : <Spinner/>
                    }
                </form>
            </Fragment>
        );
    }
}

export default AddImages;
