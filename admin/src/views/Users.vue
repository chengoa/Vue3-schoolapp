<template>
	<div class="bg-white rounded-md w-full">
		<div class="flex items-center justify-between pt-3 px-6">
			<div class="block">
				<h2 class="text-sm text-gray-600 font-bold">用户名单</h2>
				<span class="text-xs">请刷新页面</span>
			</div>
			<div class="flex items-center justify-between">
				<el-input size="mini" class="ml-1 block rounded-md" @input="searchMember" v-model="input"
					style="background-color:rgb(248,250,252)" type="text" name="" id="" placeholder="查找成员...">
				</el-input>
				<div class="flex justify-end w-3/4 lg:ml-40 ml-10 space-x-8 text-xs">
					<div @click="dialogNewTableVisible = true"
						class="font-bold text-xs text-white bg-indigo-600 px-2 py-2 rounded-md tracking-wider cursor-pointer">
						新增
					</div>


					<el-popover placement="bottom" trigger="hover">
						<template #reference>
							<div
								class="font-bold text-xs text-white bg-indigo-600 px-2 py-2  rounded-md tracking-wider cursor-pointer">
								清空
							</div>
						</template>
						<div class="text-xs tracking-wide whitespace-pre">
							<font class="iconfont icon-tishi text-gray-600"></font> 清空操作不可撤回
						</div>
					</el-popover>
				</div>
			</div>
			<el-dialog class="absolute" v-model="dialogNewTableVisible" width="40%">
				<div>
					<el-avatar shape="square" :size="100" fit="fit" src="url"></el-avatar>
				</div>
				<div>
					<el-form ref="insertContent" :model="insertItem" status-icon :rules="rules">
						<div class="flex justify-between">
							<el-form-item label="姓名" class="font-semibold																																																							">
								<el-input size="small" v-model="insertItem.name" placeholder="姓名"></el-input>
							</el-form-item>
							<el-form-item label="年级">
								<el-select size="small" v-model="insertItem.grade" placeholder="部门">
									<el-option label="2020" value="2020"></el-option>
									<el-option label="2021" value="2021"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flex justify-between">
							<el-form-item label="账号">
								<el-input size="small" v-model="insertItem._account" placeholder="账号"></el-input>
							</el-form-item>
							<el-form-item label="性别">
								<el-select size="small" v-model="insertItem.sex" placeholder="性别">
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>
						</div>

						<div>
							<el-form-item>
								<button @click="insert" class="w-full px-6 py-2 mx-auto block rounded-md text-sm font-semibold bg-indigo-600 text-white  ">确定新增</button>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</el-dialog>
		</div>
		<div>
			<div class="-mx-2 sm:-mx-2 px-4 sm:px-8 py-6 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal text-blueGray-700 relative">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blueGray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
									style=" background-color:rgb(248,250,252)">
									信息
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blueGray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
									style=" background-color:rgb(248,250,252)">
									性别
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blueGray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
									style=" background-color:rgb(248,250,252)">
									账号
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blueGray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
									style=" background-color:rgb(248,250,252)">
									年级
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blueGray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
									style=" background-color:rgb(248,250,252)">
									状态
								</th>
								<th v-if="isSearch"
									class="px-2 py-3 border-b-2 border-gray-200 bg-blueGray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
									style=" background-color:rgb(248,250,252)">
									操作
								</th>
							</tr>
						</thead>
						<tbody v-if="isSearch">
							<tr v-for="(item,index) in member" :key="item">
								<th class="px-5 py-4 border-b border-gray-200 bg-white text-xs">
									<div class="flex items-center">
										<div class="flex-shrink-0 w-10 h-10">
											<img class="w-full h-full rounded-full"
												:src="item.avatar"
												alt="" />
										</div>
										<div class="ml-3">
											<p class="whitespace-no-wrap">
												{{item.name}}
											</p>
										</div>
									</div>
								</th>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<p class="whitespace-no-wrap">{{item.sex}}</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<p class="whitespace-no-wrap">
										{{item._account}}
									</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<p class="whitespace-no-wrap">
										{{item.grade}}
									</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<span class="relative inline-block px-3 py-1 font-semibold text-slate-500 leading-tight">
										<span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
											:class="freeStatusBg(item)"></span>
										<span class="relative" :class="freeStatusText(item)">1</span>
									</span>
								</td>
								<td v-if="isSearch" class="-px-1 py-5 border-b border-gray-200 bg-white text-xs">
									<div class="flex items-center space-x-2">
										<div class="iconfont icon-bianji cursor-pointer text-center py-1 w-7 h-7 hover:bg-slate-200 rounded-full"  @click="clickEdit(item)">
											<el-dialog class="absolute" v-model="dialogTableVisible" width="40%">
												<!-- <div>
													<el-avatar shape="square" :size="100" fit="fit" src="url"></el-avatar>
												</div> -->
							
													<div class="antialiased text-gray-900" :model="editItem">
														<div class="mx-4 card bg-white max-w-md px-10 md:rounded-lg my-8 mx-auto">

															<div class="options md:flex md:space-x-6 text-sm items-center text-left text-gray-700 mt-4">
																<p class="w-1/2 mb-2 md:mb-0">{{editItem.name}}</p>
																<select
																	class="w-full border border-gray-200 p-2 focus:outline-none focus:border-gray-500" v-model="editItem.status">
																	<option value="在校">在校</option>
																	<option value="假期">假期</option>
																	<option value="实习">实习</option>
																	<option value="其他">其他</option>
																</select>
															</div>

															<div class="form mt-4">
																<div class="flex flex-col text-sm">
																	<label for="title" class="font-bold mb-2 text-left">年级</label>
																	<input
																		class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
																		type="text"
																		v-model="editItem.grade"
																		>
																</div>

													
															</div>

															<div class="submit">
																<button 
																	type="submit"
																	@click="update"
																	class=" w-full bg-blue-600 shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none ">
																	确定更新
																	</button>
															</div>
														</div>

													</div>
													<!-- <el-form :model="editItem">
														<div class="flex justify-between">
															<el-form-item label="姓名">
																<el-input size="small" v-model="editItem.name" placeholder="姓名"></el-input>
															</el-form-item>
															<el-form-item label="部门">
																<el-select size="small" v-model="editItem.role" placeholder="部门">
																	<el-option label="测绘" value="测绘"></el-option>
																	<el-option label="遥感" value="遥感"></el-option>
																</el-select>
															</el-form-item>
														</div>
														<div class="flex justify-between">
															<el-form-item label="联系">
																<el-input size="small" v-model="editItem.contact" disabled placeholder="联系"></el-input>
															</el-form-item>
															<el-form-item label="状态">
																<el-select size="small" v-model="editItem.status" placeholder="状态">
																	<el-option label="办公" value="办公"></el-option>
																	<el-option label="外出" value="外出"></el-option>
																	<el-option label="请假" value="请假"></el-option>

																</el-select>
															</el-form-item>
														</div>

														<div>
															<el-form-item>
																<el-button type="primary" size="small" round="true" @click="update">确定修改</el-button>
															</el-form-item>
														</div>
													</el-form> -->
											
											</el-dialog>
										</div>

										<div @click="clickDel(item._account,item.name)" class="iconfont icon-shanchu cursor-pointer text-center py-1 w-7 h-7 hover:bg-slate-200 rounded-full">
											<el-dialog center="true" v-model="dialogVisible" width="30%">
												<div class="text-sm text-black font-bold tracking-wide text-center">您确定删除'{{delName}}'这条数据吗？
												</div>
												<!-- <template #title>
												<div class="iconfont icon-dengchu m-auto text-5xl"> </div>
											</template> -->
												<template #footer>
													<div class="flex justify-center space-x-8">
														<el-button
															class="font-bold text-sm text-white  px-2 py-2  rounded-md tracking-wider cursor-pointer"
															@click="dialogVisible = false">取消</el-button>
														<el-button
															class="font-bold text-sm text-white  px-2 py-2  rounded-md tracking-wider cursor-pointer"
															@click="del(item)">确定</el-button>
													</div>
												</template>
											</el-dialog>
										</div>

									</div>
								</td>


							</tr>

						</tbody>

						<tbody v-else>
							<tr v-for="(item,index) in searchContent" :key="item">
								<th class="px-5 py-4 border-b border-gray-200 bg-white text-xs">
									<div class="flex items-center">
										<div class="flex-shrink-0 w-10 h-10">
											<img class="w-full h-full rounded-full"
												:src="item.avatar"
												alt="" />
										</div>
										<div class="ml-3">
											<p class="whitespace-no-wrap">
												{{item.name}}
											</p>
										</div>
									</div>
								</th>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<p class="whitespace-no-wrap">{{item.sex}}</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<p class="whitespace-no-wrap">
										{{item._account}}
									</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<p class="whitespace-no-wrap">
										{{item.grade}}
									</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-xs">
									<span class="relative inline-block px-3 py-1 font-semibold text-slate-500 leading-tight">
										<span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
											:class="freeStatusBg(item)"></span>
										<span class="relative" :class="freeStatusText(item)">1</span>
									</span>
								</td>
							</tr>
						</tbody>
					</table>

					<div v-if="isSearch"
						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
						<span class="text-xs xs:text-sm text-gray-900">
							- 显示 {{first}} ~ {{last > entries ? entries : last}} 从 <span class="font-bold">{{entries}}</span> 项中 -
						</span>
						<div class="inline-flex mt-2 xs:mt-0">
							<button v-if="first > 1 ? true : false" @click="prev"
								class="iconfont icon-shangyiye text-xs text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
							</button>
							&nbsp; &nbsp;
							<button v-if="entries > last ? true : false" @click="next"
								class="iconfont icon-xiayiye text-xs text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		watch
	} from 'vue';
	import {
		Http,
		Gql
	} from '@/utils/HttpKit.ts'
	import {
		ElMessage
	} from 'element-plus'
	import _ from "lodash";
	import moment from "moment";
	import { useStore } from 'vuex';
	

	const store = useStore();


	const dialogVisible = ref(false);
	const dialogTableVisible = ref(false);
	const dialogNewTableVisible = ref(false);
	// 在删除、编辑对话框中 定义新的model值
	const delContact = ref(null);
	const delName = ref(null);
	const editItem = ref(null);
	const insertContent = ref(null);
	const insertItem = reactive({
		_account: '',
		name: '',
		sex: '',
		grade: ''
	})
	
	const input = ref('');
	const member = ref(null);
	const entries = ref(null);
	const searchContent = ref(null);
	const isSearch = ref(true);
	let start = 0;
	const count = 4;
	let first = ref(1);
	let last = ref(4);

	// 分页 graphql 直接数据库查询
	const memberGql = async () => {
		const q = {
			query: `
			{
				member (start:${start}, count:${count}) {
					_account
					avatar
					name
					sex
					grade
				},
				entries {
					name
				}
			}
		`
		}
		try {
			const res = await Gql(q);
			member.value = res.data.member;
			entries.value = res.data.entries.length;
		} catch (error) {
			console.log(error);
		}
	}
	memberGql();

	const freeStatus = ["假期","在校","实习"];
	const freeStatusBg = computed(() => {
		return (item) => {
			return freeStatus.indexOf(item.status) > -1 ? "bg-red-200" : ""
		}
	})

	const freeStatusText = computed(() => {
		return (item) => {
			return freeStatus.indexOf(item.status) > -1 ? "text-white" : ""
		}
	})

	const next = async () => {
		first.value += count;
		last.value += count;
		start += count;
		await memberGql();
	}

	const prev = async () => {
		if (start) {
			first.value -= count;
			last.value -= count;
			start = start - count;
			await memberGql();
		} else {
			ElMessage({
				message: "已经是第一页内容",
				type: 'info',
				center: "true",
				offset: 50
			})
		}
	}

	// 搜索 按name字段 接graphql
	const searchMember = _.debounce(async () => {
		isSearch.value = !isSearch.value;
		const q = {
			query: `
				{
					searchmember (name:"${input.value}") {
						_account
						avatar
						name
						sex
						grade
					}
				}
			`
		}
		try {
			const res = await Gql(q);
			searchContent.value = res.data.searchmember;
		} catch (error) {
			console.log(error);
		}
	}, 1500)

	const clickDel = (contact, name) => {
		dialogVisible.value = true;
		delContact.value = contact;
		delName.value = name;
	}
	// 删除 按_account字段 接api
	const del = async () => {
		const res = await Http("/del", {
			_account: delContact.value
		});
		if (res.code === 1) {
			ElMessage({
				message: "删除成功",
				type: 'info',
				center: "true",
				offset: 50
			})
		} else {
			ElMessage({
				message: "出错 打开控制台",
				type: 'info',
				center: "true",
				offset: 50
			})
		}
		dialogVisible.value = false;
		memberGql();

	}

	const clickEdit = (item) => {
		dialogTableVisible.value = true;
		editItem.value = item;
	}
	const update = async () => {
		const res = await Http("/updata", {
			item: editItem.value
		});
		if (res.code === 1) {
			ElMessage({
				message: "修改成功",
				type: 'info',
				center: "true",
				offset: 50
			})
		} else {
			ElMessage({
				message: "出错 打开控制台",
				type: 'info',
				center: "true",
				offset: 50
			})
		}
		dialogTableVisible.value = false;

	}

	const insert = async () => {
		await insertContent.value.validate();
		const res = await Http("/insert", {
			content: insertItem
		})
		if (res.code === 1) {
			ElMessage({
				message: "增加成功",
				type: 'info',
				center: "true",
				offset: 50
			})
		} else {
			ElMessage({
				message: "出错 打开控制台",
				type: 'info',
				center: "true",
				offset: 50
			})
		}
		memberGql();
		dialogNewTableVisible.value = false;
	}
</script>

<style scoped>

</style>