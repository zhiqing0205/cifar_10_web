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
        <el-row :gutter="20">
	        <el-col :span="10">
				<el-upload
					class="upload-demo"
					style="min-height: 40vh"
					drag
					:before-upload="beforeImgUpload"
					action="/api/classify/img/"
					:on-success="handleImgSuccess"
					:on-progress="handleImgProgress"
				>
					<el-icon class="el-icon--upload"><upload-filled/></el-icon>
					<div class="el-upload__text">
						Drop file here or <em>click to upload</em> to classify.
					</div>
					<template #tip>
						<div class="el-upload__tip">
							jpg/png files with a size less than 5MB
						</div>
					</template>
				</el-upload>
	        </el-col>
	        <el-col :span="14" v-if="imgUrl !== ''">
		       <el-card style="min-height: 50vh" class="result">
			       <h1>图片预测为 <span>{{result}}</span>，概率为 <span>{{probability}}%</span></h1>
			       <img :src="imgUrl">
		       </el-card>
            </el-col>
        </el-row>
	    <el-row v-show="imgUrl !== ''">
		    <el-col :span="24" style="margin-top: 20px">
			    <el-card>
				    <div style="height: 350px" id="probability_list_echarts">
					   
				    </div>
			    </el-card>
		    </el-col>
	    </el-row>
    </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import {UploadFilled} from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import {ElMessage} from 'element-plus'

export default defineComponent({
    name: "Home",
	components: {
		UploadFilled
	},
    setup() {
		
		const imgUrl = ref('');
		const result = ref('');
		const probability = ref();
		const probability_list = ref([])
		
		const drawEcharts = () => {
			const data = []
			const item_data = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
			for(let i = 0; i < probability_list.value.length; i++) {
				if (result.value === item_data[i]) {
					data.push({
						value: probability_list.value[i],
						itemStyle: {
							color: '#a90000'
						}
					})
				} else {
					data.push(probability_list.value[i])
				}
			}
			var option = {
				xAxis: {
					type: 'category',
					data: item_data
				},
				yAxis: {
					type: 'value',
					name: "单位：%",
				},
				series: [
					{
						data: data,
						type: 'bar',
						label: {
							normal: {
								show: true,
								formatter: function (params) { //标签内容
									return params.value + '%'
								},
							}
						}
					}
				],
				title: {
					text: '预测各类的概率分布'
				},
				tooltip: {
					trigger: "axis",
					formatter: function(params) {
						return params[0].value + '%'
					}
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
			};

			const myChart = echarts.init(document.getElementById('probability_list_echarts'));
			myChart.setOption(option);
	    }

		const beforeImgUpload = (file) => {
			console.log(file)
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 5;
			if (!isJpgOrPng) {
				ElMessage.error('上传的图片只能是 JPG/PNG 格式!');
			}
			
			if (!isLt2M) {
				ElMessage.error('上传的图片大小不能超过 5MB!');
			}
			
			return isJpgOrPng && isLt2M;
		}
		
		const handleImgSuccess = (res, file) => {
			console.log(res)
			imgUrl.value = res.data.imgUrl;
			result.value = res.data.result;
			probability.value = res.data.probability;
			probability_list.value = res.data.probability_list;
			setTimeout(() => {
				drawEcharts()
			}, 300)
		}
		
		const handleImgProgress = (event, file) => {
			console.log(event)
			console.log(file)
		}
		
		onMounted(() => {
			// drawEcharts()
		});
		
        return {
			imgUrl,
			result,
	        probability,
	        probability_list,
	        drawEcharts,
			beforeImgUpload,
			handleImgSuccess,
	        handleImgProgress,
        };
    },
});
</script>

<style scoped>
.result img {
	max-width: 500px;
	max-height: 300px;
	margin: 0 auto;
	display: block;
}

span {
	font-size: 23px;
	color: red;
	font-weight: bolder;
}
</style>
