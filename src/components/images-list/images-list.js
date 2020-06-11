import React, {Component} from "react";
import axios from "axios";

import './images-list.css';
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import API from "../api/API"

class ImagesList extends Component {
    state = {
        images: [],
        loading: true,
        error: false
    };

    componentDidMount() {
        this.getImages();
    };

    onDelete = (id) => {
        const removableImage = {
            imageId: id
        };
        this.setState({
            loading: true
        });
        axios.post(API.apiURL + "/Image/Remove", removableImage)
            .then(res => {
                this.getImages();
            })
            .catch(err => console.log(err));
    };

    getImages() {
        //const url = "https://gooly-backend.herokuapp.com/Images";
        const url = API.apiURL + "/Images";
        axios.get(url)
            .then(res => {
                this.setState({
                    images: res.data.images,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    error: true
                })
            });
    };

    render() {
        let images = this.state.images;

        if (this.state.error) {
            return <ErrorIndicator/>
        }

        return (
            <div className='images-list d-flex flex-column align-items-center'>
                <div className='images-list__title'>
                    <h2>Images</h2>
                </div>

                {
                    this.state.loading
                        ? <Spinner/>
                        : <div className='images-list__table'>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Data</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    images.map(({name, data, id}, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{name}</td>
                                                <td><img src={data} alt='kek'/></td>
                                                <td>
                                                    <button
                                                        onClick={() => this.onDelete(id)}
                                                        type='submit'
                                                        className="btn btn-outline-danger btn-sm ">
                                                        <i className="fa fa-trash-o"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        );
    };
}

export default ImagesList;