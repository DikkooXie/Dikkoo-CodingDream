# 开源大模型的时代，你怎么能不知道Ollama？

## 入门篇：认识开源大模型和Ollama

### Ollama是什么？

Ollama是一个便于用户在本地部署和管理开源大语言模型的应用框架，极大简化了开源大语言模型的安装和配置细节。现在，即便你不了解大模型相关的任何知识，你依旧可以通过简单的操作，借助Ollama在本地部署当今主流的开源大模型，包含`llama3`、`gemma`、`qwen`等（其支持的开源大模型可在[library (ollama.com)](https://ollama.com/library)中查看）。

### 在Windows上安装并使用Ollama

1. **下载安装包：** 访问[Ollama官网](https://ollama.com/)，在页面中心处点击“Download"按钮即可下载Ollama的Windows安装包。

    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0cdd7f30d12460db6100f2fee7c026f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1263&h=1021&s=77206&e=png&b=ffffff" alt="image.png" width="50%" />


    <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c56571e305b24501b3ef4d94c5f02d8e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=839&h=945&s=44099&e=png&b=fefefe" alt="image.png" width="38%" />

1. **安装Ollama：** 点击运行刚刚下载好的安装包，直接点击右下角的"Install"即可安装，中途没有任何的选项与提示。**注意：Ollama会自动安装在C盘且不能自定义安装目录，C盘爆红选手谨慎安装。**


    <p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99b4544df7c24c6cb46297d6ed9a7848~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=894&h=658&s=23060&e=png&b=fefefe" alt="image.png" width="50%" /></p>

1. **检查安装：** 安装完成后Ollama会自动运行，它没有任何的UI界面，只会悄悄地运行在后台（默认端口11434），你可以通过以下方式判断安装结果：

    - **方式一：检查任务栏**

        ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ddb46d2cd874db8b0ce99bb71b5efe9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=478&h=242&s=70972&e=png&b=f9f9f9)

    - **方式二：浏览器访问`http://localhost:11434`**

        ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd04b7e0c57d4f9da3e6c95dcd2576d4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=248&h=144&s=2857&e=png&b=1e1e1e)

    - **方式三：在`cmd`中使用`ollama -v`**
        
        ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c963193d269449489cf5ed441edb6a52~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=258&h=52&s=2680&e=png&b=0d0d0d)

1. **部署大模型：** 使用`ollama run <model name>`部署/运行大模型。`<model name>`可以在[ollama library](https://ollama.com/library)中查询，其中有众多**标签**可供选择，要注意选择适合自己电脑配置的模型哦！

    <p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1145fffbecc5440aa4e37d0713580d72~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=800&h=890&s=54800&e=png&b=ffffff" alt="image.png" width="70%" /></p>

    这里我选择`qwen:7b`进行部署，输入命令后，如ollama发现当前没有安装这个模型，则会自动开始下载和安装：

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ec71f22bfe547bea9a6b16715b9ad3c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1085&h=80&s=7460&e=png&b=0c0c0c)
    
    > **C盘爆红选手注意：**
    > 
    > Ollama的模型安装路径也默认在C盘，如需更改Ollama的模型安装路径，需添加环境变量
    > 
    > <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d77b9111af644242991bb2a1cd75e5ed~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1088&h=782&s=85923&e=png&b=282828" alt="image.png" width="70%" />
    > <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e32695537934d83bf9a8770b231322c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=616&h=655&s=144817&e=png&b=f0f0f0" alt="image.png" width="70%" />

    安装完成后，即可在命令行中与模型对话啦！

### 为什么选择开源大模型？

如果你在其它社区平台搜索关于Ollama的消息，一定会见到很多人认为开源大模型对普通人来说是个累赘品。受制于普通平民电脑的性能，我们一般无法在自己电脑上安装性能较好的模型，因此最后的效果大多都不尽人意，还不如使用现在众多免费的私人大模型平台，如`ChatGPT3.5`等。

既然如此，开源大模型到底适用于什么应用场景，我们为何要使用Ollama呢？既然和免费私有大模型比不过性能，不如换个角度比“**客制化**”。

- **社区灵活性**

像ChatGPT等企业私有模型大多都有既定的输出风格，且没有明确的使用方向，主打一个“综合性”。但代价就是在做“特种”AI时没有竞争力，发现问题你也无法改变它，只能接受它的一切。

但开源大模型的代码和架构是公开的,用户可以根据自己的需求进行定制和调整,增强了适用性。光是在B站搜索“模型名+微调”，你就可以收获大量资料可供参考。用开源大模型定制自己的“小老婆”不香嘛？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6d6a601b1d8422cbeb5cdd2391e2cd7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1686&h=899&s=1053210&e=png&b=fdfcfc)

- **搭建知识库+隐私保护**

既然开源大模型可以移植到本地运行，那么意味着它是个离线平台，隐私保护可谓顶尖存在。这对有~~隐私洁癖~~和企业信息保密需求的用户来说是非常重要了。

不仅如此，你也可以在本地构建自己的知识库，上传文件、投喂数据，让本地大模型作为你的资料管家。

- **节省成本**

开源大模型通常可以免费获取和使用，开发应用时也无需再调取天价API让钱包两空了。在云端服务器上部署开源大模型构建AI应用也是不错的选择！



## 进阶篇：Ollama的更多运用

### 用Open WebUI可视化管理Ollama

#### 关于Open WebUI

Open WebUI 是一个功能丰富、易于使用的自托管 WebUI，旨在完全离线运行。它支持多种 LLM 运行器，包括 Ollama 和 OpenAI API。

使用它和Ollama配合，就可以摆脱黑乎乎的命令行窗口与你在Ollama上部署的大模型对话，并且享用与ChatGPT如出一辙的优雅UI界面。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaaf19cbcb324113bfc9c9829bed7e52~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1701&h=953&s=67248&e=png&b=191919)

在这里你可以与你所有已安装的模型进行对话，也可以管理Ollama上的模型：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6994c61868840468b44677a6e35717b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=594&h=365&s=19693&e=png&b=1b1b1b)

如果你的机器足够强悍，也可以借助这个平台将机器上的大模型分享给你的同事/好友一同使用，Open WebUI也不同用户权限的设置。

#### 安装Open WebUI

Open WebUI官方推荐使用`docker`安装，如果在本机运行Ollama，你只需在电脑中安装docker，然后运行以下指令：
```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

> 如果Ollama不在本机运行，则需在命令中添加`-e OLLAMA_BASE_URL = http://example.com:11434`设置Ollama运行的地址哦！

之后即可访问`localhost:3000`进入Open WebUI界面啦！

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb2734d557414785a5cd40f3669ea400~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=736&h=510&s=19887&e=png&b=0e0e0e)

首次使用需要点击`Sign up`注册账号，第一个账号注册的账号会默认拥有管理员权限。

注册完成后会自动登录，此时点击左下角的头像，点击`Settings`即可进入设置页面，以调整语言、Ollama路径、Ollama模型等设置：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e97e9d43f554b11bad887b66e97ee7e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=360&h=333&s=11436&e=png&b=1a1a1a)

### 用FastGPT客制化大模型

Open WebUI只让我们收获了一个优雅的界面便于我们访问和管理Ollama运行的模型，但貌似并没有体现Ollama与开源大模型的优势。接下来，FastGPT可以带你构建一个强大的**私人本地知识库**！

[快速了解 FastGPT（FastGPT文档）](https://doc.fastai.site/docs/intro/)

FastGPT 是一个基于 LLM 大语言模型的知识库问答系统，提供开箱即用的数据处理、模型调用等能力。同时可以通过 Flow 可视化进行工作流编排，从而实现复杂的问答场景！

如果你现在还没有在本地部署Ollama与FastGPT，又想快速尝试FastGPT的功能，可以使用官方已经部署好的 [FastGPT Demo](https://fastgpt.in/) 进行体验！

接下来将介绍它的几个特色功能：

- **打造专属AI客服**

大语言模型横空出世时，就有不少人幻想它替代客服岗位的样子。但受制于OpenAI API价格昂贵，一些企业内部规定不便对外流出也不便融入大模型开发中等因素，AI客服的应用场景还是较少地进入我们的视野。

但是FastUI第一个能力便是打造专属AI客服。你可以通过导入企业服务规定、客服培训内容、企业项目介绍等文件构建客服知识库。如在本地部署，这些知识库将处于离线状态，可以有效保护企业隐私信息。

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab2988f02228438f8a60c5ec7107c6aa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=561&s=28265&e=png&b=ffffff" alt="image.png" width="50%" /></p>

之后可以根据构建的知识库创建AI应用，甚至设置不同工作流以优化客服AI的实际使用效果，让它更加智能，回答准确率更高！

- **自动数据预处理**

FastGPT对于构建知识库的过程做了诸多优化，提供手动输入、直接分段、LLM 自动处理和 CSV 等多种数据导入途径。

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf5be4e578d742e5ba1585a5253d63e5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=161&h=229&s=5568&e=png&b=ffffff" alt="image.png" width="25%" />

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca0159f5664f4fa0b9e81b51bdb76b72~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=603&h=354&s=14532&e=png&b=f3f5fb" alt="image.png" width="70%" />

其中“直接分段”支持通过 PDF、WORD、Markdown 和 CSV 文档内容作为上下文。上传内容后，FastGPT 会自动对文本数据进行预处理、向量化和 QA 分割，节省手动训练时间，提升效能。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c15e7d9123ab42d59fea8b7557744ba3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1413&h=924&s=264956&e=png&b=f4f7f9)

另外还支持搜索测试，检测知识库文本与测试提问语句的相关度，检验知识库文本和问题的相关度。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/333a10f389004cc6a05027264b6a485d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1387&h=519&s=86113&e=png&b=f7f7f9)

- **工作流编排**

前面提到，在应用AI客服场景中，可以使用工作流编排优化AI客服的使用效果。FastGPT提供多种工作流功能，甚至可以自己开发插件满足客制化需要，而且编排界面也是非常友好，小白也能理解！

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be835033b71845fc846cd5ca119a6a36~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1701&h=958&s=182250&e=png&b=f5f6f9)

- **强大的API集成**

FastGPT 对外的 API 接口对齐了 OpenAI 官方接口，可以直接接入现有的 GPT 应用，也可以轻松集成到企业微信、公众号、飞书等平台。这样，就可以使用免费的开源大模型构建属于自己的AI应用了！

## 总结：开源大模型的意义是什么？

### 开源大模型的优势

1.  **降低使用门槛**：开源大模型使得非专业用户也能接触到尖端的人工智能技术。无论是学生、研究人员还是中小企业，都可以通过开源大模型进行创新和研发，而不再受制于高昂的成本。
1.  **促进技术创新**：开源社区的活跃度和多样性使得技术可以快速迭代和优化。全球的开发者可以共同参与模型的改进和应用，推动技术的不断进步。
1.  **增强透明度和信任**：开源的本质决定了其透明性。用户可以详细了解模型的构建和工作原理，减少对“黑箱”算法的担忧，从而增加对人工智能技术的信任。
1.  **推动教育普及**：开源大模型为教育机构提供了丰富的教学资源。学生可以通过实际操作，深入理解人工智能技术的运作机制，培养实践能力和创新意识。

### 开源大模型对科技平权的推动

#### 提供公平的技术资源

开源大模型打破了技术垄断，使得先进的人工智能技术不再是少数几家大公司的专利。任何人都可以平等地获取和利用这些资源，从而大大降低了创新的成本和门槛。这为各行各业的中小企业、初创公司和个人开发者提供了公平竞争的机会。

#### 支持多样化应用

由于开源大模型的灵活性，用户可以根据自身需求进行个性化的调整和优化。无论是在医疗、教育、金融还是社会公益领域，开源大模型都可以被广泛应用，从而推动各个领域的科技进步，促进社会的整体发展。

开源大模型的流行，意味着人们了解AI、使用AI的门槛进一步降低，不需要高昂的成本，就可以创造出大模型的差异性，进一步推进了技术平权。这同样意味着，把握住开源大模型的浪潮，就是掌住了下一个科技创业的风口。

### 开源大模型与私有大模型的对比

#### 成本

-   **开源大模型**：用户可以免费获取和使用模型，极大地降低了技术门槛和使用成本。这对于中小企业和个人开发者尤为重要。
-   **私有大模型**：通常需要支付高额的费用才能获取使用权，这使得许多资源有限的用户难以承担。

#### 透明度

-   **开源大模型**：由于代码和模型参数都是公开的，用户可以详细了解模型的构建和运作机制，增强了透明度和信任度。
-   **私有大模型**：通常是“黑箱”操作，用户难以了解模型的内部细节，增加了不确定性和信任问题。

#### 创新速度

-   **开源大模型**：开源社区的协作能够快速迭代和优化模型，促进技术的快速发展和普及。
-   **私有大模型**：依赖于公司内部的研发团队，创新速度相对较慢，且成果不易对外共享。

#### 灵活性

-   **开源大模型**：用户可以根据自身需求自由修改和优化模型，适应多样化的应用场景。
-   **私有大模型**：用户只能在提供的功能范围内使用，灵活性较低，难以满足个性化需求。
