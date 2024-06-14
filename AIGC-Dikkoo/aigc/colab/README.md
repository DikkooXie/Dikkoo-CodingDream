## 关于colab

Colab（Colaboratory）是一个免费的基于 Jupyter Notebook 的环境,由 Google 提供。

它允许你在浏览器中编写和运行代码，无需本地安装任何软件。

Colab 为你提供了 GPU 和 TPU 的计算资源，使得你能够在短时间内运行复杂的机器学习和深度学习模型。它非常适合于教学、快速原型制作和小型研究项目。

## transformers库

Transformers 是由 Hugging Face 开发和维护的一个非常著名的自然语言处理库。它提供了大量的预训练的深度学习模型,这些模型可以应用于各种自然语言处理任务,如文本分类、问答、命名实体识别等。

> Hugging Face 是一家专注于自然语言处理和深度学习的公司。它维护着一个名为 Transformers 的开源库,其中包含了各种预训练的自然语言处理模型,如 BERT、GPT-2、RoBERTa 等。使用 Transformers 库,你可以轻松地访问这些预训练模型,并将它们应用于自己的自然语言处理任务,如文本分类、问答、命名实体识别等。Hugging Face 还提供了一个叫做 Datasets 的开源库,里面包含了各种常用的自然语言处理数据集。总的来说,Hugging Face 为自然语言处理领域提供了丰富的资源和工具。

### 安装

```bash
pip install transformers
```

### 常用函数

#### pipeline

pipeline 函数是 Transformers 库中一个非常便利的功能,它允许你快速地利用预训练的 NLP 模型来执行各种常见的自然语言处理任务,而无需自己手动加载和配置模型。

使用 pipeline 函数,你可以一行代码就完成诸如文本分类、命名实体识别、问答等任务。例如:

```py
from transformers import pipeline

# 实例化
clssifier = pipeline('sentiment-analysis', model="uer/roberta-base-finetuned-dianping-chinese")

# 调用
result1 = clssifier('I like you')
print(result1)
result2 = clssifier('thank you')
print(result2)
result3 = clssifier('遥遥领先')
print(result3)
result4 = clssifier('自适应')
print(result4)

# 输出结果
# [{'label': 'positive (stars 4 and 5)', 'score': 0.8544366955757141}]
# [{'label': 'positive (stars 4 and 5)', 'score': 0.6356890797615051}]
# [{'label': 'positive (stars 4 and 5)', 'score': 0.941333532333374}]
# [{'label': 'negative (stars 1, 2 and 3)', 'score': 0.6380083560943604}]
```

在这案例中，使用了`pipline()`函数实例化了一个情感分析 pipline对象。它使用了一个预训练的 RoBERTa 模型,该模型在点评数据集上进行了微调。

通过调用 clssifier 对象的方法，我们可以对输入的文本进行情感分类。

pipeline 函数支持的任务包括:

- 文本分类 ('text-classification')
- 问答 ('question-answering')
- 命名实体识别 ('ner')
- 文本生成 ('text-generation')
- 语义相似度匹配 ('similarity')