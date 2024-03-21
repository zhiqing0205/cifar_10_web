<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<the-header></the-header>
			</el-header>
			<el-main style="min-height: 80vh">
				<router-view/>
			</el-main>
			<el-footer>
				<the-footer></the-footer>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import TheHeader from "@/components/the-header.vue";
import TheFooter from "@/components/the-footer.vue";
export default defineComponent({
	components: {
		TheHeader,
		TheFooter,
	},
	setup() {
		return {};
	},
});

</script>

<style lang="less">

</style>
