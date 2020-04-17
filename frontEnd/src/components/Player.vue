<template>
  <div id="aplayer" class="aplayer">
    <!-- <audio src="@/assets/media/aaa111.m4a"></audio> -->
  </div>
</template>

<script>
import APlayer from 'APlayer';
import musicInfo from '../musicInfo';
export default {
  name: 'Player',
  data() {
    return {
      ap: null
    };
  },
  mounted() {
    this.ap = new APlayer({
      container: document.getElementById('aplayer'),
      loop: 'all',
      order: 'random',
      preload: 'auto',
      volume: 0.7,
      fixed: true,
      lrcType: 1,
      mutex: true,
      listFolded: true,
      listMaxHeight: '220px',
      audio: musicInfo.playlists
    });
  }
};
</script>

<style>
.aplayer-list-cur,
.aplayer-thumb,
.aplayer-played,
.aplayer-volume-bar .aplayer-volume {
  background: #ff8a00 !important;
}
.aplayer .aplayer-lrc .aplayer-lrc-contents p {
  color: #888;
  font-size: 16px;
  line-height: 20px !important;
}
.aplayer .aplayer-lrc .aplayer-lrc-contents p.aplayer-lrc-current {
  color: #fa7298;
  font-weight: bold;
  font-size: 20px;
}
@media screen and (max-width: 980px){
    #aplayer {
        display: none !important;
    }
}
</style>