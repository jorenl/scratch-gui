import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import LanguageModalComponent from '../components/language-modal/language-modal.jsx';

import '../../../scratch-language-learning/utils.js';
import LUIS from '../../../scratch-language-learning/luis.js';
import LanguageLearningComponents from '../../../scratch-language-learning/components.js';
import App from '../../../scratch-language-learning/app.js';

class LanguageModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOk',
            'handleCancel',
            'handleAdd'
        ]);
        this.state = {status: null};
        this.utterances = [];
        
        this.el_view_container = null; // div element gets inserted here
    }

    componentDidMount() {
        if (this.props.action == 'learn') {
            this.props.model.loadData().then(() => {

                this.view = new LanguageLearningComponents.InteractiveUtteranceView(this.props.model);
                if (this.props.lastRecognition) {
                    this.view.displayRecognition(this.props.lastRecognition);
                } else {
                    this.view.setInput(true);
                }

                this.el_view_container.appendChild(this.view.el);
            });
        } else if (this.props.action == 'selectModel') {
            setTimeout(() => {
                /**
                 * this timeout is awful, but the components aren't able to retrieve the templates from the DOM otherwise
                **/

                this.view = new LanguageLearningComponents.ModelListView(this.props.models);

                this.view.onCreateNew = () => {
                    this.props.onOk('CREATE_NEW_MODEL');
                }
                this.view.onSelect = (model_app_id) => {
                    this.props.onOk(model_app_id);
                }
                this.view.update();
                this.el_view_container.appendChild(this.view.el);
            }, 100);
        }
    }
    componentWillUnmount() {

    }
    
    handleOk () {
        if (this.props.action=='learn') {
            var u = this.view.utterance;
            var m = this.props.model;

            this.setState({status: 'Saving...'});
            
			m.addExample( u )
			.then( () => m.startTraining() )
			.then( () => m.waitForTrainingToComplete() )
			.then( () => m.publish() )
			.then( () => {
                console.log('Published!');
                this.props.onOk();
            });
        } else {
            this.props.onOk();
        }
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleAdd () {
        if (!this.props.action=='learn') return;
        if (this.view.utterance) {
            this.utterances.push(this.view.utterance);
        }
        this.view.utterance = null;
        this.view.setInput(true);
    }

    render () {
        return (
            <LanguageModalComponent
                title = {this.props.action == 'learn' ?
                        'Train your Language Brain!' :
                        'Pick or create a Language Brain for this project'}
                action = {this.props.action}
                refViewContainer = {el => this.el_view_container = el}
                status={this.state.status}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                onAdd={this.handleAdd}
                onOptionSelection={this.handleOptionSelection}
            />
        );
    }
}

LanguageModal.propTypes = {
    action: PropTypes.string.isRequired,
    model: PropTypes.object,
    lastRecognition: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default LanguageModal;
