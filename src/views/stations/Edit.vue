<template>
        <div class="edit-form-wrapper" >
            <label>Device Name</label>
            <v-text-field
              required
              v-model="station.deviceName"
            ></v-text-field>
        </div>

</template>

<script>
export default {
    name:'Edit',
    props:['station']
}
</script>