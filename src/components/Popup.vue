<template>
    <md-modal-dialog>
        <md-dialog-title>Guess a number</md-dialog-title>

        <md-dialog-content>
            <md-field>
                <label>A number</label>
                <md-input type="number" v-model="number" />
            </md-field>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button @click="$modal.submit(number)">Submit</md-button>
            <md-button @click="$modal.cancel()">Cancel</md-button>
        </md-dialog-actions>
    </md-modal-dialog>
</template>
  
<script>
export default {
    name: 'GuessDialog',
}
</script>