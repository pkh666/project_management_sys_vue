<template>
    <el-table :data="invitations" style="width: 100%">
        <el-table-column prop="projectName" label="项目"></el-table-column>
        <el-table-column prop="memberName" label="成员"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="inviter" label="邀请者"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="success" @click="handleInvitation(scope.row, '1')">接受</el-button>
                <el-button type="danger" @click="handleInvitation(scope.row, '2')">拒绝</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userId = ref('1');

interface ProjectMemberVo {
  id: number;
  projectName: string;
  memberName: string;
  status: string;
  inviter: string;
}

const invitations = ref<ProjectMemberVo[]>([]);

const fetchInvitations = async () => {
  try {
    const response = await axios.get('/api/member/invitations', { params: { userId: userId.value } });
    invitations.value = response.data.data;
  } catch (error) {
    console.error('Error fetching invitations:', error);
  }
};

const handleInvitation = async (invitation: ProjectMemberVo, status: string) => {
  try {
    const response = await axios.put('/api/member/invitations', { ...invitation, status });
    if (response.data.code === 200) {
      await fetchInvitations();
      alert('操作成功');
    } else {
      alert('操作失败');
    }
  } catch (error) {
    console.error('Error handling invitation:', error);
  }
};

onMounted(fetchInvitations);
</script>

<style lang="css" scoped></style>