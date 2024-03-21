<!--
 * @Description:
 * @Version: 2.0
 * @Author: Zhiqing Zhong
 * @Date: 2022-01-31 02:47:52
 * @LastEditors: Zhiqing Zhong
 * @LastEditTime: 2022-02-23 00:34:24
-->
<template>
    <div class="home">
		<el-card>
			<el-row :gutter="20">
				<el-col :span="15">
					<img src="https://s2.loli.net/2022/07/16/Z1lXqt3iY5STInK.png" alt="">
				</el-col>
				<el-col :span="9">
					<h1>CIFAR-10数据集</h1>
					
					<p class="desc">
						该数据集共有60000张彩色图像，这些图像是32*32，分为10个类，每类6000张图。这里面有50000张用于训练，构成了5个训练批，每一批10000张图；另外10000用于测试，单独构成一批。测试批的数据里，取自10类中的每一类，每一类随机取1000张。抽剩下的就随机排列组成了训练批。注意一个训练批中的各类图像并不一定数量相同，总的来看训练批，每一类都有5000张图。
					</p>

					　　
				</el-col>
			</el-row>
		</el-card>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "Home",
    setup() {
        return {};
    },
});
</script>

<style scoped>
img {
	height: 100%;
	width: 100%;
}

.desc {
	text-indent: 2em;
	font-size: 18px;
	line-height: 30px;
}
</style>
