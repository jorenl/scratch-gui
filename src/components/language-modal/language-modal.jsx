import {defineMessages, FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './language-modal.css';

// Import stuff from the language learning mockup
import '!style-loader!raw-loader!../../../../scratch-language-learning/app.css';

// import dropdownIcon from './icon--dropdown-caret.svg';

const LanguageModalComponent = props => (
    <Modal
        id='languageModal'
        className={styles.modalContent}
        contentLabel={props.title}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>

            <div ref={props.refViewContainer}></div>

            {props.action == 'learn' && (
                <Box className={styles.buttonRow}>
                    <button
                        className={styles.cancelButton}
                        onClick={props.onCancel}
                    >
                        <FormattedMessage
                            defaultMessage="Cancel"
                            description="Button in prompt for cancelling the dialog"
                            id="gui.prompt.cancel"
                        />
                    </button>
                    <button
                        className={styles.addButton}
                        onClick={props.onAdd}
                    >
                        <FormattedMessage
                            defaultMessage="Add another"
                            description="Button in language modal for adding another example"
                            id="gui.language.adc"
                        />
                    </button>
                    <button
                        className={styles.okButton}
                        onClick={props.onOk}
                    >
                        {props.status ? (
                            <div class="status-indicator">
                                <div class="label">{props.status}</div>
                                <div class="spinner"></div>
                            </div>
                        ) : (
                            <FormattedMessage
                                defaultMessage="OK"
                                description="Button in prompt for confirming the dialog"
                                id="gui.prompt.ok"
                            />
                        )}
                    </button>
                </Box>
            )}
        </Box>
        <template id="tpl-modellistview">
            <div class="modellist">
                <div class="button light button-create">
                    <span class="label">➕ Create new language brain!</span>
                </div>
                <div class="model-list">
                    <div class="button button-model">
                        <span class="label">(existing model name goes here)</span>
                    </div>
                </div>
            </div>
	    </template>
        <template id="tpl-inspectview">
            <div class="inspect">
                <div class="intentboxes"></div>
            </div>
        </template>
        <template id="tpl-intentview">
            <div class="intentbox">
                <div class="intentblock"></div>
                <div class="utterances"></div>
            </div>
        </template>
        <template id="tpl-utteranceview">
            <div class="utterance">
                <div>
                    <div class="text callout"></div>
                </div>
                <div class="entities"></div>
            </div>
        </template>
        <template id="tpl-interactiveutteranceview">
            <div class="interactiveutterance">
                <div class="utterance-panel">
                    <div class="input-callout callout">
                        <input type="text" placeholder="Type a sentence to understand..."></input>
                        <span class="text"></span>
                    </div>
                </div>
                <div class="recognition-panel">
                    <div class="intent"></div>
                    <div class="entities">
                        <div class="minibutton button-save">v</div>
                        <div class="minibutton button-clear">x</div>
                    </div>
                    <div class="variablewatcher button-add-entity"> Make a Variable... </div>
                </div>
            </div>
        </template>
        <template id="tpl-variablewatcherview">
            <div class="variablewatcher">
                <span class="name"></span>
                <span class="value"></span>
            </div>
        </template>
        <template id="tpl-floatingdropdown">
            <div class="floatingdropdown">
                <div class="arrow"></div>
                <div class="content">
                    <div class="item">
                        <div class="checkmark">✔</div>
                        <div class="label"></div>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
);

LanguageModalComponent.propTypes = {
    //isStage: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    //onChange: PropTypes.func.isRequired,
    //onKeyPress: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onAdd: PropTypes.func
    //onOptionSelection: PropTypes.func.isRequired,
    //placeholder: PropTypes.string,
    //showMoreOptions: PropTypes.bool.isRequired,
    //title: PropTypes.string.isRequired
};

export default LanguageModalComponent;
