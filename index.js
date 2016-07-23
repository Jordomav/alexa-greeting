/**
 * Created by JordanMavrogeorge on 7/23/16.
 */

/**
 * Start the greeting Launchrequest.
 */
var alexa = require('alexa-app');
var app = new alexa.app();

app.launch(function (request, response) {
    response.say('Who is there?');
    response.shouldEndSession(false);
    response.send();
});

/**
 * Start the IntentRequest
 */
app.intent('VisitorIntent',
    {
        /**
         * Fill the intent for the greeting
         */

        'slots':{'Visitor': 'LIST_OF_VISITORS'},
        'utterances': [
            '{Visitor}',
            '{Visitor and {Visitor}}'
        ]
    },

    /**
     * Say the greeting to the +Visitor+
     * @param request
     * @param response
     */
    function (request,response) {
        var visitor = request.slot('Visitor');
            response.say('Hello '+visitor+' its nice to see you');
            response.shouldEndSession(true);
            response.send();
    }
);

/**
* End session with Alexa
 **/
app.intent('EndIntent',
    {
        /*
        Ending Utterances
         */
        'utterances': [
            'end', 'cancel', 'stop'
        ]
    },
    /**
    *Alexa Sends back the session exit response
    *
     **/
    function (request,response) {
        setTimeout(function () {
            response.say('goodbye');
            response.send();
        }, 250);

        return false;
    }
);

/**
* Error Handling
 * @param exception
 * @param request
 * @param response
 **/

app.error = function (exception, request, response) {
    response.say('Sorry, I can not do that right now');
};
/**
* Connect to lambda
 */

exports.handler = app.lambda();