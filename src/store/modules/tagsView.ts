import { defineStore } from "pinia";

// cachedViews存储的是需要缓存的页面的name
// visitedViews存储的是需要显示的页面的对象
interface State {
  visitedViews: any[];
  cachedViews: any[];
}

export const useTagsViewStore = defineStore({
  id: "tagsView",
  state: (): State => ({
    visitedViews: [],
    cachedViews: [],
  }),
  actions: {
    add_visited_view(view: any) {
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
    add_cached_view(view: any) {
      if (this.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name);
      }
    },
    del_visited_view(view: any) {
      // 返回的是index和value
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          // 删除显示数组的当前位置的元素
          this.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    del_cached_view(view: any) {
      // 为什么要用for循环，因为splice方法会改变数组的长度，所以不能用forEach
      for (const i of this.cachedViews) {
        if (i === view.name) {
          const index = this.cachedViews.indexOf(i);
          this.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    // 删除除了当前视图之外的其他视图(保存当前视图和固定的视图)
    del_other_visited_views(view: any) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path;
      });
    },
    // 删除除了当前缓存之外的其他缓存(保存当前缓存
    del_other_cached_views(view: any) {
      const index = this.cachedViews.indexOf(view.name);
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1);
      } else {
        this.cachedViews = [];
      }
    },
    // 删除所有的视图(保存固定的视图)
    del_all_visited_views() {
      const affixTags = this.visitedViews.filter((tag) => tag.meta.affix);
      this.visitedViews = affixTags;
    },
    // 删除所有的缓存
    del_all_cached_views() {
      this.cachedViews = [];
    },
    // 更新视图
    update_visited_view(view: any) {
      for (let i = 0; i < this.visitedViews.length; i++) {
        if (this.visitedViews[i].path === view.path) {
          this.visitedViews[i] = Object.assign({}, this.visitedViews[i], view);
          break;
        }
      }
    },
    // 添加视图
    add_view(view: any) {
      this.add_visited_view(view);
      this.add_cached_view(view);
      // console.log(this.visitedViews, this.cachedViews);
    },
    // 删除视图
    del_view(view: any) {
      return new Promise((resolve) => {
        this.del_visited_view(view);
        this.del_cached_view(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    //删除可见视图
    delVisitedView(view: any) {
      return new Promise((resolve) => {
        this.del_visited_view(view);
        resolve([...this.visitedViews]);
      }
      )
    },
    // 删除缓存视图
    delCachedView(view: any) {
      return new Promise((resolve) => {
        this.del_cached_view(view);
        resolve([...this.cachedViews]);
      }
      )
    },
    // 删除其他可见视图
    delOthersViews(view: any) {
      return new Promise((resolve) => {
        this.del_other_visited_views(view);
        resolve([...this.visitedViews]);
      })
    },
    // 删除其他缓存视图
    delOthersCachedViews(view: any) {
      return new Promise((resolve) => {
        this.del_other_cached_views(view);
        resolve([...this.cachedViews]);
      })
    },
    // 删除所有视图
    delAllViews() {
      return new Promise((resolve) => {
        this.del_all_visited_views();
        this.del_all_cached_views();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      })
    },
    // 删除所有可见视图
    delAllVisitedViews() {
      return new Promise((resolve) => {
        this.del_all_visited_views();
        resolve([...this.visitedViews]);
      })
    },
    // 删除所有缓存视图
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.del_all_cached_views();
        resolve([...this.cachedViews]);
      })
    }
  }
});