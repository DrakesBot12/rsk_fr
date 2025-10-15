import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import { useProfile } from "@/hooks/fetchProfile";
import { useProjects } from "@/hooks/fetchProjects";

import { categories as staticCategories } from "../_categories";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import Index from "@/assets/general/index.svg";
import Notify from "@/assets/general/notify.svg";
import Link from "next/link";

export default function CategoryPage() {
  const router = useRouter();
  const [dataProfile, fetchProfile] = useState({ Organization: 2 });
  const { loading, categories: projects, error, fetchProjects } = useProjects();
  const { category: url } = router.query;

  useEffect(() => {
    fetchProjects(dataProfile.Organization);
  }, [dataProfile.Organization]);

  if (!router.isReady || !url)
    return (
      <Layout>
        <div>Загрузка...</div>
      </Layout>
    );

  if (loading) {
    return (
      <Layout>
        <Header>
          <Header.Heading>Проекты</Header.Heading>
          <Button icon>
            <Notify />
          </Button>
        </Header>
        <div className="flex h-full items-center justify-center">
          <p>Загрузка проектов...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Header>
          <Header.Heading>Проекты</Header.Heading>
          <Button icon>
            <Notify />
          </Button>
        </Header>
        <div className="flex h-full items-center justify-center">
          <p className="text-red-500">Ошибка: {error}</p>
        </div>
      </Layout>
    );
  }

  const staticCategory = staticCategories.find((c) => c.url === url);

  if (!staticCategory) {
    return (
      <Layout>
        <Header>
          <Header.Heading>Проекты</Header.Heading>
        </Header>
        <div className="hero" style={{ placeItems: "center" }}>
          <div className="flex flex-col gap-[1rem] col-start-4 col-end-10">
            <h1>Категория "{url}" не найдена</h1>
            <Button big onClick={() => router.push("/projects")}>
              Вернуться назад
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const projectsInCategory = projects.filter((p) => p.star_category === url);

  if (projectsInCategory.length === 0) {
    return (
      <Layout>
        <Header>
          <Header.Heading>Проекты</Header.Heading>
        </Header>
        <div className="hero" style={{ placeItems: "center" }}>
          <div className="flex flex-col gap-[1rem] col-start-4 col-end-10">
            <h1>Проекты в категории "{url}" не найдены</h1>
            <Button big onClick={() => router.push("/projects")}>
              Вернуться назад
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const completedCount = projectsInCategory.filter((p) =>
    p.tasks.every((t) => t.status === "SUCCESS")
  ).length;
  const total = projectsInCategory.length;

  const sortedBase = projectsInCategory
    .sort((a, b) => a.id - b.id)
    .map((project, idx) => ({
      ...project,
      originalIdx: idx,
    }));

  const sorted = [
    ...sortedBase.filter((p) => !p.tasks.every((t) => t.status === "SUCCESS")),
    ...sortedBase.filter((p) => p.tasks.every((t) => t.status === "SUCCESS")),
  ];

  return (
    <Layout>
      <Header>
        <Header.Heading>
          Проекты <span className="text-[var(--color-gray-black)]">/</span> {staticCategory.name}
        </Header.Heading>
        <Button icon>
          <Notify />
        </Button>
      </Header>
      <div className="hero" style={{ gridTemplateRows: "max-content" }}>
        <div className="col-span-12 flex items-start justify-between">
          <hgroup>
            <h3>{staticCategory.name}</h3>
            <p className="text-[var(--color-gray-black)]">{staticCategory.desc}</p>
          </hgroup>
          <Card>
            <Card.Heading>
              <h5>
                Вы выполнили <span className="text-[var(--color-blue)]">{completedCount}</span> проекта из{" "}
                <span className="text-[var(--color-blue)]">{total}</span>
              </h5>
              <div className="w-full rounded-[6.25rem] overflow-hidden bg-[var(--color-blue-noise)] h-[.75rem]">
                <div
                  className="bg-[var(--color-blue)] h-full"
                  style={{
                    width: `${(completedCount / total) * 100}%`,
                  }}
                ></div>
              </div>
            </Card.Heading>
            <Card.Footer className="text-[var(--color-white)]">
              <div className="z-10">Мотивационный текст :)</div>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-span-12 grid grid-cols-3 gap-[1.25rem] h-fit">
          {sorted.map((project, idx) => (
            <div
              key={project.originalIdx}
              className="flex flex-col min-h-[200px] justify-between gap-[1rem] p-[1.25rem] rounded-[1rem] border-[1.5px] border-[var(--color-gray-plus-50)] hover:bg-[var(--color-white-gray)] hover:border-[var(--color-white-gray)] transition"
            >
              <div className="flex flex-col gap-[.5rem]">
                <div className="flex justify-between items-center gap-[.5rem]">
                  <h5>{project.title}</h5>
                  <span className="link big text-[var(--color-gray-white)]">#{project.originalIdx + 1}</span>
                </div>
                <p className="text-[var(--color-gray-black)]">{project.description}</p>
              </div>

              <Link href={`/projects/${url}/aicourses`}>
                <div
                  className={`flex items-center justify-center px-[.75rem] py-[1rem] rounded-[6.25rem] ${
                    project.tasks.every((t) => t.status === "SUCCESS")
                      ? "bg-[var(--color-green-noise)] text-[var(--color-green-peace)]"
                      : "bg-[var(--color-gray-plus-50)] text-[var(--color-black)]"
                  }`}
                >
                  {project.tasks.every((t) => t.status === "SUCCESS") ? "Выполнено" : "Выполнить"}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}