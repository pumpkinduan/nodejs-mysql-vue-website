<template>
  <div class="photoPublish">
    <el-container>
      <el-form :label-position="labelPosition" label-width="100px">
        <el-form-item label="上传的相片：">
          <el-upload
            action
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleFileChange"
            :on-remove="handleRemove"
            :http-request="uploadCompressImage"
          >
            <div class="el-upload__text">
              <em>选择上传的图片吧</em>
            </div>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="上传进度：">
          <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>

<script>
import api from "@/api/upload.js";
import { compress } from "@/util/compress.js";
import download from "@/util/download.js";
export default {
  name: "photoPublish",
  data() {
    return {
      percentage: 0,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      labelPosition: "right",
      dialogImageUrl: "",
      dialogVisible: false,
      deleted: false
    };
  },
  methods: {
    handleFileChange(file) {
      let _self = this;
      compress({
        target: file.raw,
        target_size: 450,
        maxWidth: 650,
        maxHeight: 500,
        onSuccess: data => {
          _self.uploadCompressImage(data);
        }
      });
    },
    uploadErr() {
      this.$message.error("upload failed");
    },
    uploadCompressImage(file) {
      let formData = new FormData();
      file.blob && formData.append("picture", file.blob, file.name);
      formData.append("type", 1);
      api
        .uploadImg(formData, {
          // `onUploadProgress` 允许为上传处理进度事件
          onUploadProgress: progressEvent => {
            this.percentage =
              (progressEvent.loaded / progressEvent.total) * 100;
          }
        })
        .then(res => {
          this.$message({
              type: 'success',
              duration: 400,
              message: "图片上传成功"
            });
          setTimeout(() => {
            this.percentage = 0;
          }, 1000);
          console.log(res.data);
        })
        .catch(err => {
          this.uploadErr();
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      this.deleted = true;
    },
    handleDownload(file) {
      if (!file || !file.raw) return;
      download.download(file.raw);
    }
  }
};
</script>

<style scoped>
.photoPublish {
  padding: 20px;
}
.el-form-item {
  display: flex;
  align-items: center;
}
.el-form-item >>> .el-form-item__content {
  margin-left: 0 !important;
}
</style> 